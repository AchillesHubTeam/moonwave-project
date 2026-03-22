import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardLayoutClient from "./layout-client";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return <DashboardLayoutClient session={session}>{children}</DashboardLayoutClient>;
}
