import { TextField } from "@mui/material";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  useState,
} from "react";
import { updateProfile } from "../lib/api-calls";
import { UserContext } from "./user-context";
import { BlackButton } from "./styled/button-styles";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { checkValidFile } from "../lib/verify-upload";

interface EditProfileProps {
  setOpenEditProfileDialog(status: boolean): void;
  userData: any;
  fetchUserData(): void;
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { user, setUser } = useContext(UserContext);

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

  const [mediaLocalPath, setMediaLocalPath] = useState<string>("");

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

      console.log(res);

      const userData = res.data.user;
      if (userData) {
        // TODO: update our local user object, refactor functionality
        let currUserData = localStorage.getItem("user");
        if (currUserData) {
          const currUserObj = JSON.parse(currUserData);
          const newUserData = { ...currUserObj, ...userData };
          localStorage.setItem("user", JSON.stringify(newUserData));
          setUser(newUserData);
        }
      }
    } catch (error) {
      alert("An error occured, please try again later.");
      return;
    }
  };

  const handleSelectPhoto = () => {
    // Simulate click on our invisible input file
    inputPhotoFile.current?.click();
  };

  const handleChangePhoto = () => {
    const selectedFile = inputPhotoFile.current?.files?.[0];

    if (!selectedFile) {
      alert("Could not process this photo file.");
      return;
    }

    if (!checkValidFile(selectedFile)) {
      alert("Could not process this photo file.");
      return;
    }

    // TODO: change the visible photo
    setSelectedPhotoFile(selectedFile);

    // Show photo before saving
    setMediaLocalPath(URL.createObjectURL(selectedFile));

    // alert("Filed successfully selected. Save to upload file.");
  };

  const handleSelectHeader = () => {
    console.log("changing header");
    alert("Banner customisation is to be added.");
  };

  const handleDeleteHeader = () => {
    console.log("deleting header");
    alert("Deleting banner is to be added.");
  };

  return (
    <div className="flex w-full flex-col p-1">
      <form onSubmit={handleForm} className="flex flex-col gap-2 py-0">
        {/* Top row to exit and save */}
        <div className="flex flex-row items-center pl-2">
          <div
            className="m-auto cursor-pointer rounded-full p-1 hover:bg-gray-200"
            onClick={() => props.setOpenEditProfileDialog(false)}
          >
            <CloseIcon className="" />
          </div>
          <div className="grow px-2 text-xl font-bold">Edit profile</div>
          <BlackButton type="submit">Save</BlackButton>
        </div>

        {/* Header and photo changes */}
        <div>
          <div className="pb-4">
            {/* Header image */}
            <div className="z-0 h-48 w-full overflow-hidden">
              <div className="relative">
                <div className="absolute z-20 z-20 min-h-full min-w-full bg-black opacity-20" />
                <div className="absolute z-20 h-full w-full text-white">
                  <div className="mt-24 flex items-center justify-center gap-4">
                    {/* Photo icon */}
                    <div
                      className="h-12 w-12 rounded-full bg-black opacity-70 hover:cursor-pointer hover:opacity-50"
                      onClick={handleSelectHeader}
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <AddAPhotoOutlinedIcon />
                      </div>
                    </div>

                    {/* Delete icon */}
                    <div
                      className="h-12 w-12 rounded-full bg-black opacity-70 hover:cursor-pointer hover:opacity-50"
                      onClick={handleDeleteHeader}
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <CloseIcon />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                <Image
                  // src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${props.userData.photo}`}
                  src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${
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
                <div className="relative z-20 flex items-center justify-center">
                  <div className="absolute z-10 min-h-full min-w-full rounded-full border-4 bg-black opacity-25" />
                  <div className="absolute z-20 text-white">
                    <div className="h-12 w-12 rounded-full bg-black opacity-70 hover:cursor-pointer hover:opacity-50">
                      <div
                        className="flex h-full w-full items-center justify-center"
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
                  <div className="relative aspect-square h-36">
                    <Image
                      src={
                        mediaLocalPath
                          ? mediaLocalPath
                          : `${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${props.userData.photo}`
                      }
                      fill
                      alt={props.userData.username}
                      className="z-0 m-auto rounded-full !border-4 !border-solid !border-white object-cover"
                    />
                  </div>
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
          <span className="font-bold">Birth date:</span>
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
