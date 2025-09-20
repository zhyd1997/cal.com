import { ShellMainAppDir } from "app/(use-page-wrapper)/(main-nav)/ShellMainAppDir";
import type { PageProps } from "app/_types";
import { _generateMetadata, getTranslate } from "app/_utils";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { getTeamsFiltersFromQuery } from "@calcom/features/filters/lib/getTeamsFiltersFromQuery";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

import EventTypes, { EventTypesCTA } from "~/event-types/views/event-types-listing-view";

import { getUserEventGroups } from "./actions";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("event_types_page_title"),
    (t) => t("event_types_page_subtitle"),
    undefined,
    undefined,
    "/event-types"
  );

const Page = async ({ searchParams }: PageProps) => {
  const _searchParams = await searchParams;
  const _headers = await headers();
  const _cookies = await cookies();

  const session = await getServerSession({ req: buildLegacyRequest(_headers, _cookies) });
  if (!session?.user?.id) {
    return redirect("/auth/login");
  }

  const t = await getTranslate();
  const filters = getTeamsFiltersFromQuery(_searchParams);
  const userEventGroupsData = await getUserEventGroups(filters);

  return (
    <ShellMainAppDir
      heading={t("event_types_page_title")}
      subtitle={t("event_types_page_subtitle")}
      CTA={<EventTypesCTA userEventGroupsData={userEventGroupsData} />}>
      <EventTypes userEventGroupsData={userEventGroupsData} user={session.user} />
    </ShellMainAppDir>
  );
};

export default Page;
