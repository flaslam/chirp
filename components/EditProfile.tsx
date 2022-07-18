import { TextField } from "@mui/material";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { updateProfile } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { BlackButton, BlueLargeButton, StandardButton } from "./Styled/Buttons";
import CloseIcon from "@mui/icons-material/Close";

interface EditProfileProps {
  setOpenEditProfileDialog(status: boolean): void;
}

const EditProfile: React.FC<EditProfileProps> = ({
  setOpenEditProfileDialog,
}) => {
  const { user, setUser } = useContext(UserContext);

  const [formInputData, setFormInputData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  // Updates our formInputData as we type into our input fields
  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setFormInputData({ ...formInputData, [input.id]: input.value });
  };

  // On form submit we prepare data to send
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    // TODO: temporary
    setOpenEditProfileDialog(false);

    // Create form data
    const formData = new FormData();

    // Loop through formInputData and append each to formData
    for (let key in formInputData) {
      formData.append(key, formInputData[key as keyof typeof formInputData]);
    }

    // Send form data to server
    submitData(formData);
  };

  // Handle sending data and the resolving the outcome of login attempt
  const submitData = async (data: FormData) => {
    let res;

    try {
      res = await updateProfile(data);
    } catch (error) {
      alert("An error occured, please try again later.");
      return;
    }

    // Close dialog popup
    setOpenEditProfileDialog(false);
  };

  return (
    <div className="flex flex-col p-2 w-96">
      <div>
        <form onSubmit={handleForm} className="flex flex-col gap-4 py-0">
          <div className="flex flex-row items-center">
            <div
              className="cursor-pointer m-auto rounded-full hover:bg-gray-200 p-1"
              onClick={() => setOpenEditProfileDialog(false)}
            >
              <CloseIcon className="" />
            </div>
            <div className="grow px-2 font-bold text-xl">Edit profile</div>
            <BlackButton type="submit">Save</BlackButton>
          </div>
          <TextField id="name" required label="Name" onChange={handleChange} />
          <TextField id="location" label="Location" onChange={handleChange} />
          <TextField
            id="bio"
            label="Bio"
            onChange={handleChange}
            multiline
            minRows={3}
            inputProps={{ maxLength: 160 }}
            type="bio"
          />
          <div className="flex flex-col gap-2">
            <span className="font-medium">Birth date:</span>
            <TextField
              id="birthDate"
              // label="Birth date"
              type="date"
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
