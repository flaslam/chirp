import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "./user-context";

// Icons
import { HiHome, HiOutlineHome, HiUser, HiOutlineUser } from "react-icons/hi";
import { RiQuillPenFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";

import { motion } from "framer-motion";
import { BlueLargeButton } from "./Styled/Buttons";

interface link {
  name?: string;
  link: string;
  icon: JSX.Element;
  iconFilled?: JSX.Element;
  reqLoggedIn?: boolean;
}

const links: link[] = [
  {
    link: "/",
    icon: <FaTwitter style={{ color: "#1d9bf0" }} />,
  },
  { name: "Home", link: "/", icon: <HiOutlineHome />, iconFilled: <HiHome /> },
  {
    name: "Profile",
    link: "/",
    icon: <HiOutlineUser />,
    iconFilled: <HiUser />,
    reqLoggedIn: true,
  },
];

const SidebarLeft = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const currentRoute = router.asPath;

  const [openUserPanel, setOpenUserPanel] = useState<boolean>(false);

  return (
    <div className="flex h-screen w-20 flex-col items-center overflow-y-auto px-2 pt-2 md:w-60 md:items-start xl:w-sb-left">
      {/* First flex element: all icons */}
      <div className="flex w-full grow flex-col items-center gap-2 md:items-start">
        {links.map((link, index) => {
          // Get active link
          let targetLink = link.link;
          if (link.name === "Profile" && user) {
            targetLink = `/${user.username}`;
          }

          // Is this link the one we are currently on?
          const linkIsActive = currentRoute === targetLink;

          // const iconProps = linkIsActive?{ (style: { fill: "black" }) }: null;
          // {React.cloneElement(link.icon, iconProps)}

          return link.reqLoggedIn === true && !user ? null : (
            <div key={index}>
              <Link href={link.reqLoggedIn ? user.username : link.link}>
                <a>
                  {/* Full view with text */}
                  <div className="hidden items-center gap-3 rounded-full p-2 text-xl transition hover:bg-gray-200 md:flex">
                    <span className="text-3xl">
                      {linkIsActive && link.iconFilled
                        ? link.iconFilled
                        : link.icon}
                    </span>
                    {!link.name ? null : (
                      <span
                        className={`pr-2 ${linkIsActive ? "font-bold" : null}`}
                      >
                        {link.name}
                      </span>
                    )}
                  </div>

                  {/* Single column view */}
                  <div className="block rounded-full p-2 text-3xl transition hover:bg-gray-200 md:hidden">
                    {link.icon}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}

        {/* Post button full width */}
        <div className="hidden w-full py-3 md:block">
          <Link href="/">
            <a>
              <div className="flex items-center justify-center">
                <BlueLargeButton>Compose Post</BlueLargeButton>
              </div>
            </a>
          </Link>
        </div>

        {/* Post button single icon */}
        <div className="py-3 md:hidden">
          <Link href="/">
            <a>
              <div className="text-3xl md:hidden">
                <div className="rounded-full bg-sky-500 p-2 transition hover:bg-sky-600">
                  <RiQuillPenFill style={{ fill: "white" }} />
                </div>
              </div>
            </a>
          </Link>
        </div>
      </div>

      {/* Second flex element: bottom user panel */}
      <div className="flex items-center py-10">
        {!user ? null : (
          <div
            className={`flex flex-row gap-2 rounded-full p-2 hover:cursor-pointer hover:bg-gray-200`}
            onClick={() => setOpenUserPanel((prevState) => !prevState)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
              width="48"
              height="48"
              alt={user.username}
              className="rounded-full"
            />
            <div className="hidden pr-2 md:block">
              <div className="font-bold">{user.displayName}</div>
              <div>@{user.username}</div>
            </div>

            {/* Pop up */}
            {!openUserPanel ? null : (
              <motion.div
                className="absolute z-50 -translate-y-full"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex -translate-y-4 flex-col justify-center divide-y rounded-xl bg-white drop-shadow-lg">
                  {/* 1st row */}
                  <div className="flex cursor-default flex-row gap-2 py-4 pl-4 pr-12">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DB_HOST}/${user.photo}`}
                      width="48"
                      height="48"
                      alt={user.username}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div>@{user.username}</div>
                    </div>
                  </div>

                  {/* 2nd row */}
                  <Link href="/">
                    <a>
                      <div className="rounded-b-lg py-4 pl-4 pr-12 hover:bg-gray-200">
                        Log out @{user.username}
                      </div>
                    </a>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLeft;
