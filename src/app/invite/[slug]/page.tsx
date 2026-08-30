import InvitationApp from "@/components/invitation/InvitationApp";
import { invitationContent } from "@/data/invitationContent";
import { getGuestBySlug } from "@/data/guests";

export default async function GuestInvitePage({
  params,
}: PageProps<"/invite/[slug]">) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  return (
    <InvitationApp content={invitationContent} guestName={guest?.name} />
  );
}
