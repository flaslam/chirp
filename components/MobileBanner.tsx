import React, { useContext } from "react";
import { UserContext } from "./UserContext";

const MobileBanner = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-row justify-between sm:hidden [&>*]:flex [&>*]:basis-1/3 [&>*]:items-center mx-12">
      <div className="justify-start">Menu</div>
      <div className="justify-center">Home</div>
      <div className="justify-end">ok</div>
    </div>
  );
};

export default MobileBanner;
