import DashboardLayout from "@/components/DashboardLayout";
import OpenSource from "@/sections/OpenSource";

export default function OpenSourcePage() {
  return (
    <DashboardLayout title="Open Source">
      <div className="px-4 lg:px-6">
        <OpenSource />
      </div>
    </DashboardLayout>
  );
}
