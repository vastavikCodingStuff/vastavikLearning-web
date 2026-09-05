import AuthedClientLayout from "../ClientLayout";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return <AuthedClientLayout><DashboardContent /></AuthedClientLayout>;
}