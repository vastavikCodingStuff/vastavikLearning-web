import AuthedClientLayout from "../ClientLayout";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  return <AuthedClientLayout><ProfileContent /></AuthedClientLayout>;
}