import { Outlet } from "react-router-dom";
import ProfileNavigation from "../components/Profile/ProfileNavigation";

const ProfilePage = () => {
  return (
    <>
      <ProfileNavigation />
      <Outlet />
    </>
  );
};

export default ProfilePage;
