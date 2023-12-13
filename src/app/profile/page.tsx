import ProfileDetail from "@/components/profileDetails";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import { getServerSession } from "next-auth/next";

const Profile = async () => {
  const session  = await getServerSession(authOptions);

  return (
    <div>
      <ProfileDetail session={session} />
    </div>
  );
};

export default Profile;
