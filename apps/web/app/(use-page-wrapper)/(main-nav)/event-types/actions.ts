"use server";

import { createRouterCaller, getTRPCContext } from "app/_trpc/context";
import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";

import { eventTypesRouter } from "@calcom/trpc/server/routers/viewer/eventTypes/_router";

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

  const eventTypesCaller = await createRouterCaller(
    eventTypesRouter,
    await getTRPCContext(_headers, _cookies)
  );

  return await eventTypesCaller.getUserEventGroups({ filters });
}
