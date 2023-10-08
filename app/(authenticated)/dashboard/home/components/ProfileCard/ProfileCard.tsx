import { Card, Rating } from "flowbite-react";
import { ReactNode } from "react";
import { Profile } from "../../page";
import ProfileCardContext from "./ProfileCardContext";
import ProfileButton from "./ProfileButton";
import ProfileDescription from "../CardDescription";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import RatingStars from "../RatingStars";
import ProfileTitle from "./ProfileTitle";
import AveragePrice from "./AveragePrice";

type ProfileCardProps = {
  profile: Profile;
  image?: ReactNode;
  info?: ReactNode;
  action?: ReactNode;
};
export default function ProfileCard({
  image,
  info,
  action,
  profile,
}: ProfileCardProps) {
  return (
    <ProfileCardContext.Provider value={{ profile }}>
      <Card className="grid place-content-center">
        {image}
        {info}
        {action}
      </Card>
    </ProfileCardContext.Provider>
  );
}

ProfileCard.Image = ProfileImage;
ProfileCard.Button = ProfileButton;
ProfileCard.Title = ProfileTitle;
ProfileCard.Info = ProfileInfo;
ProfileCard.Rating = RatingStars;
ProfileCard.Description = ProfileDescription;
