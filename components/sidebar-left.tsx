import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "./user-context";

// Icons
import {
  HiHome,
  HiOutlineHome,
  HiUser,
  HiOutlineUser,
  HiLogin,
  HiUserAdd,
} from "react-icons/hi";
import { RiQuillPenFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";

import { motion } from "framer-motion";
import { BlueLargeButton } from "./Styled/Buttons";
import LogOut from "./log-out";
import LogInModal from "./log-in-modal";
import SignUpModal from "./sign-up-modal";
import ComposeModal from "./compose-modal";

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
    <div className="sticky top-0 z-30 mx-2 flex h-screen flex-col items-center justify-center pt-2 md:w-60 md:items-start xl:w-sb-left">
      {/* First verical flex element: all icons */}
      <div className="flex w-full grow flex-col items-center gap-2 md:items-start">
        {links.map((link, index) => {
          // Get current link
          let targetLink = link.link;

          if (link.name === "Profile" && user) {
            targetLink = `/${user.username}`;
          }

          // Is this link the one we are currently on?
          const linkIsActive = currentRoute === targetLink;

          return link.reqLoggedIn === true && !user ? null : (
            <div key={index}>
              <Link href={targetLink}>
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
                    {linkIsActive && link.iconFilled
                      ? link.iconFilled
                      : link.icon}
                  </div>
                </a>
              </Link>
            </div>
          );
        })}

        {!user ? null : (
          <>
            {/* Post button full width */}
            <div className="hidden w-full py-3 md:block">
              <div>
                <ComposeModal>
                  <BlueLargeButton>Compose Post</BlueLargeButton>
                </ComposeModal>
              </div>
            </div>

            {/* Post button single icon */}
            <div className="py-3 md:hidden">
              <div className="text-3xl md:hidden">
                <div className="rounded-full bg-sky-500 p-2 transition hover:cursor-pointer hover:bg-sky-600">
                  <ComposeModal>
                    <RiQuillPenFill style={{ fill: "white" }} />
                  </ComposeModal>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Second flex element: bottom user panel */}
      <div className="mb-4 flex flex-col gap-2 md:w-full md:px-4">
        {!user ? (
          <>
            <LogInModal>
              <>
                <div className="hidden w-full md:block">
                  <BlueLargeButton>Log In</BlueLargeButton>
                  {/* <div className="hidden items-center gap-3 rounded-full p-2 px-4 text-xl transition hover:cursor-pointer hover:bg-gray-200 md:flex">
                    <HiLogin /> Log In
                  </div> */}
                </div>
                {/* <div className="block rounded-full p-2 text-3xl transition hover:cursor-pointer hover:bg-gray-200 md:hidden"> */}
                <div className="rounded-full bg-sky-500 p-2 text-3xl transition hover:cursor-pointer hover:bg-sky-600 md:hidden">
                  <HiLogin style={{ fill: "white" }} />
                </div>
              </>
            </LogInModal>
            <SignUpModal>
              <>
                <div className="hidden md:block">
                  <BlueLargeButton>Sign Up</BlueLargeButton>
                </div>
                {/* <div className="block rounded-full p-2 text-3xl transition hover:cursor-pointer hover:bg-gray-200 md:hidden"> */}
                <div className="rounded-full bg-sky-500 p-2 text-3xl transition hover:cursor-pointer hover:bg-sky-600 md:hidden">
                  <HiUserAdd style={{ fill: "white" }} />
                </div>
              </>
            </SignUpModal>
          </>
        ) : (
          <div
            className={`flex flex-row  rounded-full`}
            onClick={() => setOpenUserPanel((prevState) => !prevState)}
          >
            <div className="flex flex-row gap-2 rounded-full py-2 pl-2 pr-2 hover:cursor-pointer hover:bg-gray-200 md:pr-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${user.photo}`}
                width="48"
                height="48"
                alt={user.username}
                className="rounded-full"
              />
              <div className="hidden pr-2 md:block">
                <div className="font-bold">{user.displayName}</div>
                <div>@{user.username}</div>
              </div>
            </div>

            {/* Pop up */}
            {!openUserPanel ? null : (
              <motion.div
                className="absolute z-50 min-w-max -translate-y-full"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                <div className="flex -translate-y-4 flex-col justify-center divide-y overflow-hidden rounded-xl bg-white drop-shadow-lg">
                  {/* 1st row */}
                  <Link href={`/${user.username}`}>
                    <a className="hover:cursor-pointer">
                      <div className="flex flex-row gap-2 py-4 pl-4 pr-12 hover:bg-gray-200">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_FILE_STORAGE_URL}/${user.photo}`}
                          width="48"
                          height="48"
                          alt={user.username}
                          className="rounded-full"
                        />
                        <div>
                          <div className="truncate font-bold">
                            {user.displayName}
                          </div>
                          <div>@{user.username}</div>
                        </div>
                      </div>
                    </a>
                  </Link>

                  {/* 2nd row */}

                  <LogOut>
                    <div className="py-4 pl-4 pr-12 hover:cursor-pointer hover:bg-gray-200">
                      Log out @{user.username}
                    </div>
                  </LogOut>
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
