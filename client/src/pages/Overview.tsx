import DashboardLayout from "@/components/DashboardLayout";
import ProfileCard from "@/components/dashboard/ProfileCard";
import SectionCards from "@/components/dashboard/SectionCards";
import MetricsPanel from "@/components/dashboard/MetricsPanel";
import ProjectsTable from "@/components/dashboard/ProjectsTable";

export default function Overview() {
  return (
    <DashboardLayout title="Overview">
      <ProfileCard />
      <SectionCards />
      <MetricsPanel />
      <ProjectsTable />
    </DashboardLayout>
  );
}
