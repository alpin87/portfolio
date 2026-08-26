import DashboardLayout from "@/components/DashboardLayout";
import Skills from "@/sections/Skills";

export default function SkillsPage() {
  return (
    <DashboardLayout title="Skills">
      <div className="px-4 lg:px-6">
        <Skills />
      </div>
    </DashboardLayout>
  );
}
