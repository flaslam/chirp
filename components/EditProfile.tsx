import React from "react";

interface EditProfileProps {
  setOpenEditProfileDialog(status: boolean): void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  setOpenEditProfileDialog,
}) => {
  return (
    <div onClick={() => setOpenEditProfileDialog(false)}>
      EditPtestsetsrofile
    </div>
  );
};

export default EditProfile;
