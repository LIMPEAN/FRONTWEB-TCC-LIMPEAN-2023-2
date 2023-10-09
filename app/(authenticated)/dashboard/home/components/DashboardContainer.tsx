import { ReactNode } from "react";

type DashboardContainerProps = {
  children: ReactNode;
};

export default function DashboardContainer({
  children,
}: DashboardContainerProps) {
  return (
    <div className="profile-container p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {children}
    </div>
  );
}
