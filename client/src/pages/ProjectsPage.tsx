import DashboardLayout from "@/components/DashboardLayout";
import Projects from "@/sections/Projects";

export default function ProjectsPage() {
  return (
    <DashboardLayout title="Projects">
      <div className="px-4 lg:px-6">
        <Projects />
      </div>
    </DashboardLayout>
  );
}
