import React, { useContext } from "react";
import { UserContext } from "./user-context";

const MobileBanner = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="mx-12 flex flex-row justify-between sm:hidden [&>*]:flex [&>*]:basis-1/3 [&>*]:items-center">
      <div className="justify-start">Menu</div>
      <div className="justify-center">Home</div>
      <div className="justify-end">View</div>
    </div>
  );
};

export default MobileBanner;
