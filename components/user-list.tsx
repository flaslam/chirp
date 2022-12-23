import Image from "next/image";
import { useContext } from "react";
import { User } from "../lib/types";
import { UserContext } from "./user-context";

interface UserListProps {
  data: User[];
}

const UserList: React.FC<UserListProps> = ({ data }) => {
  const { user } = useContext(UserContext);
  // TODO: check if you're following the user?

  return (
    <div className="flex flex-col">
      {data.length > 0
        ? data.map((item) => (
            <div key={item._id} className="flex flex-col py-2 px-4">
              <div className="flex">
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${item.photo}`}
                  alt={item.displayName}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div className="flex grow flex-col px-2">
                  <div className="flex flex-row">
                    <div className="flex grow flex-col">
                      <div>{item.displayName}</div>
                      <div className="text-slate-400">@{item.username}</div>
                    </div>

                    <div>
                      {user.following.includes(item._id)
                        ? "Following"
                        : user._id == item._id
                        ? null
                        : "Not Following"}
                    </div>
                  </div>
                  <div>{item.bio}</div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default UserList;
