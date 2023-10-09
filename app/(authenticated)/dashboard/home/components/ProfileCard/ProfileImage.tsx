import Image, { StaticImageData } from "next/image";
import { useProfileCardContext } from "./ProfileCardContext";

export default function ProfileImage() {
  const { profile } = useProfileCardContext();

  return (
    <Image className="w-30 h-30 rounded-full" src={profile.photo} alt="me" />
  );
}
