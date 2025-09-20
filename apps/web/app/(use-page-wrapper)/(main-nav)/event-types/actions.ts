"use server";

import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { checkRateLimitAndThrowError } from "@calcom/lib/checkRateLimitAndThrowError";
import { MembershipRepository } from "@calcom/lib/server/repository/membership";
import { ProfileRepository } from "@calcom/lib/server/repository/profile";
import { TeamAccessUseCase } from "@calcom/trpc/server/routers/viewer/eventTypes/teamAccessUseCase";
import { EventGroupBuilder } from "@calcom/trpc/server/routers/viewer/eventTypes/usecases/EventGroupBuilder";
import { ProfilePermissionProcessor } from "@calcom/trpc/server/routers/viewer/eventTypes/usecases/ProfilePermissionProcessor";
import { EventTypeGroupFilter } from "@calcom/trpc/server/routers/viewer/eventTypes/utils/EventTypeGroupFilter";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

export async function revalidateEventTypesList() {
  revalidatePath("/event-types");
}

export async function getUserEventGroups(filters?: {
  teamIds?: number[] | undefined;
  userIds?: number[] | undefined;
  upIds?: string[] | undefined;
}) {
  const _headers = await headers();
  const _cookies = await cookies();

  const session = await getServerSession({ req: buildLegacyRequest(_headers, _cookies) });
  if (!session?.user?.id) {
    return redirect("/auth/login");
  }

  await checkRateLimitAndThrowError({
    identifier: `eventTypes:getUserProfiles:${session.user.id}`,
    rateLimitingType: "common",
  });

  const user = session.user;
  const userProfile = user.profile;

  if (!userProfile?.upId) {
    throw new Error("User profile not found");
  }

  // Validate profile exists
  const profile = await ProfileRepository.findByUpId(userProfile.upId);
  if (!profile) {
    throw new Error("Profile not found");
  }

  // Initialize dependencies
  const dependencies = {
    membershipRepository: MembershipRepository,
    profileRepository: ProfileRepository,
    teamAccessUseCase: new TeamAccessUseCase(),
  };

  // Build event groups
  const eventGroupBuilder = new EventGroupBuilder(dependencies);
  const { eventTypeGroups, teamPermissionsMap } = await eventGroupBuilder.buildEventGroups({
    userId: user.id,
    userUpId: userProfile.upId,
    filters,
    forRoutingForms: false,
  });

  const filteredEventTypeGroups = new EventTypeGroupFilter(eventTypeGroups, teamPermissionsMap)
    .has("eventType.read")
    .get();

  // Process profiles with permissions
  const profileProcessor = new ProfilePermissionProcessor();
  const profiles = profileProcessor.processProfiles(eventTypeGroups, teamPermissionsMap);

  return {
    eventTypeGroups: filteredEventTypeGroups,
    profiles,
  };
}
