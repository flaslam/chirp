import Image from "next/image";

interface ProfileProps {
  // TODO: define user
  user: any;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div>
      {/* <div>Header image as background here</div> */}
      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
          width="100"
          height="100"
        />
      </div>
      <h2>{user.displayName}</h2>
      <h3>@{user.username}</h3>
    </div>
  );
};

export default Profile;
