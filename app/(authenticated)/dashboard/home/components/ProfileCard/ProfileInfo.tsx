import { ReactNode } from "react";

interface ProfileInfoProps {
  children: ReactNode;
}
export default function ProfileInfo({ children }: ProfileInfoProps) {
  return (
    <div className="profile-info grid place-items-center gap-4">{children}</div>
  );
}
