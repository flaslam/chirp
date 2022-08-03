import React, { Ref, RefObject, useEffect } from "react";

const useOutsideAlerter = (ref: RefObject<{}>) => {
  useEffect(() => {
    // Alert if clicked outside of element

    const handleClickOutside = (
      event: React.MouseEvent<HTMLInputElement>
    ) => {};
  });
};

export default useOutsideAlerter;
