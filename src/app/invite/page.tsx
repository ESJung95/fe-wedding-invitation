import InvitationApp from "@/components/invitation/InvitationApp";
import { invitationContent } from "@/data/invitationContent";

export default function BasicInvitePage() {
  return <InvitationApp content={invitationContent} />;
}
