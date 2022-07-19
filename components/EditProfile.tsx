import { TextField } from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { updateProfile } from "./ApiCalls";
import { UserContext } from "./UserContext";
import { BlackButton } from "./Styled/Buttons";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { checkValidFileExtension, checkValidFileSize } from "../verifyUpload";

interface EditProfileProps {
  setOpenEditProfileDialog(status: boolean): void;
  userData: any;
  fetchUserData(): void;
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { user } = useContext(UserContext);

  const inputPhotoFile = useRef<HTMLInputElement | null>(null);
  // const [photo, setPhoto] = useState<null | File>({})
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File>();

  const [formInputData, setFormInputData] = useState<{
    name: string;
    location: string;
    bio: string;
    website: string;
    birthDate: string;
  }>({ name: "", location: "", bio: "", website: "", birthDate: "" });

  // Updates our formInputData as we type into our input fields
  const handleChange = (event: ChangeEvent) => {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    setFormInputData({ ...formInputData, [input.id]: input.value });
  };

  // On form submit we prepare data to send
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    // Create form data
    const formData = new FormData();

    // Loop through formInputData and append each to formData
    for (let key in formInputData) {
      formData.append(key, formInputData[key as keyof typeof formInputData]);
    }

    // TODO: this is temp needed to name the photo file accurately
    formData.append("username", user.username);

    if (selectedPhotoFile) {
      formData.append("photo", selectedPhotoFile);
    }

    try {
      // Send form data to server
      await submitData(formData);

      // fetch data again after making change.
      await props.fetchUserData();

      // Close dialog popup
      props.setOpenEditProfileDialog(false);
    } catch (error) {
      alert("Update could not be processed. Please try again later.");
      console.log(error);
    }
  };

  // Handle sending data and the resolving the outcome of login attempt
  const submitData = async (data: FormData) => {
    try {
      let res = await updateProfile(data, user.username, user.token);

      console.log(user);
      // TODO: we need to update our local User object too bc photo link is stored there.
      console.log(res);
    } catch (error) {
      alert("An error occured, please try again later.");
      return;
    }
  };

  const handleSelectPhoto = () => {
    console.log("selecting photo");

    // Simulate click on our invisible input file
    inputPhotoFile.current?.click();
  };

  const handleChangePhoto = () => {
    console.log("changing photo");
    const selectedFile = inputPhotoFile.current?.files?.[0];

    if (!selectedFile) return;
    if (!checkValidFileExtension(selectedFile)) return;
    if (!checkValidFileSize(selectedFile)) return;

    // TODO: need to now change the visible photo
    setSelectedPhotoFile(selectedFile);
  };

  const handleSelectHeader = () => {
    console.log("changing header");
    alert("This is still to be added!");
  };

  const handleDeleteHeader = () => {
    console.log("deleting header");
    alert("This is still to be added!");
  };

  return (
    <div className="flex flex-col p-1 w-96">
      <form onSubmit={handleForm} className="flex flex-col gap-2 py-0">
        {/* Top row to exit and save */}
        <div className="flex flex-row items-center pl-2">
          <div
            className="cursor-pointer m-auto rounded-full hover:bg-gray-200 p-1"
            onClick={() => props.setOpenEditProfileDialog(false)}
          >
            <CloseIcon className="" />
          </div>
          <div className="grow px-2 font-bold text-xl">Edit profile</div>
          <BlackButton type="submit">Save</BlackButton>
        </div>

        {/* Header and photo changes */}
        <div>
          <div className="pb-4">
            {/* Header image */}
            <div className="w-full h-48 overflow-hidden z-0">
              <div className="relative">
                <div className="absolute min-w-full min-h-full z-20 bg-black opacity-20 z-20" />
                <div className="absolute text-white z-20 w-full h-full">
                  <div className="flex items-center justify-center mt-24 gap-4">
                    {/* Photo icon */}
                    <div
                      className="bg-black w-12 h-12 rounded-full opacity-70 hover:opacity-50 hover:cursor-pointer"
                      onClick={handleSelectHeader}
                    >
                      <div className="flex justify-center items-center h-full w-full">
                        <AddAPhotoOutlinedIcon />
                      </div>
                    </div>

                    {/* Delete icon */}
                    <div
                      className="bg-black w-12 h-12 rounded-full opacity-70 hover:opacity-50 hover:cursor-pointer"
                      onClick={handleDeleteHeader}
                    >
                      <div className="flex justify-center items-center h-full w-full">
                        <CloseIcon />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                <Image
                  // src={`${process.env.NEXT_PUBLIC_DB_HOST}/${props.userData.photo}`}
                  src={`${process.env.NEXT_PUBLIC_DB_HOST}/${
                    props.userData.header
                      ? props.userData.header
                      : props.userData.photo
                  }`}
                  width="100"
                  height="100"
                  alt={props.userData.username}
                  objectFit="cover"
                  layout="responsive"
                  className="-translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="flex">
              {/* Profile photo */}
              <div className="-mt-20">
                <div className="relative flex items-center justify-center z-20">
                  <div className="absolute min-w-full min-h-full z-10 bg-black border-4 rounded-full opacity-25" />
                  <div className="absolute z-20 text-white">
                    <div className="bg-black w-12 h-12 rounded-full opacity-70 hover:opacity-50 hover:cursor-pointer">
                      <div
                        className="flex justify-center items-center h-full w-full"
                        onClick={handleSelectPhoto}
                      >
                        <AddAPhotoOutlinedIcon />
                      </div>
                      {/* Input file for our photo */}
                      <input
                        type="file"
                        id="file"
                        ref={inputPhotoFile}
                        style={{ display: "none" }}
                        onChange={handleChangePhoto}
                      />
                    </div>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DB_HOST}/${props.userData.photo}`}
                    width="144"
                    height="144"
                    // layout="fixed"
                    alt={props.userData.username}
                    className="rounded-full !border-solid !border-4 !border-white z-0 m-auto"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 p-2">
          {/* Text entry fields */}
          <TextField
            id="name"
            required
            label="Name"
            onChange={handleChange}
            inputProps={{ maxLength: 50 }}
            defaultValue={props.userData.displayName}
          />
          <TextField
            id="bio"
            label="Bio"
            onChange={handleChange}
            multiline
            minRows={3}
            inputProps={{ maxLength: 160 }}
            type="bio"
            defaultValue={props.userData.bio}
          />
          <TextField
            id="location"
            label="Location"
            onChange={handleChange}
            defaultValue={props.userData.location}
          />
          <TextField
            id="website"
            label="Website"
            onChange={handleChange}
            defaultValue={props.userData.url}
          />
          {/* <div className="flex flex-col gap-2">
          <span className="font-medium">Birth date:</span>
          <TextField
            id="birthDate"
            // label="Birth date"
            type="date"
            onChange={handleChange}
            defaultValue={props.userData.birthDate}
          />
        </div> */}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
