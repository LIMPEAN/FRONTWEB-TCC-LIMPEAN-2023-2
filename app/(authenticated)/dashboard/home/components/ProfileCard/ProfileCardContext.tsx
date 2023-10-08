import { createContext, useContext } from "react";
import { Profile } from "../../page";

const ProfileCardContext = createContext<{ profile: Profile } | null>(null);

export function useProfileCardContext() {
  const context = useContext(ProfileCardContext);
  if (!context) {
    throw new Error(
      "ProfileCard.* component must be rendered as child of ProductCard component"
    );
  }
  return context;
}

export default ProfileCardContext;
