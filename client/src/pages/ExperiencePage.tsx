import DashboardLayout from "@/components/DashboardLayout";
import Experience from "@/sections/Experience";

export default function ExperiencePage() {
  return (
    <DashboardLayout title="Experience">
      <div className="px-4 lg:px-6">
        <Experience />
      </div>
    </DashboardLayout>
  );
}
