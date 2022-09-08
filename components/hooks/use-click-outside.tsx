import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLInputElement>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    // Detect if clicked outside of element
    const handleClickOutside = (event: any) => {
      if (!ref.current?.contains(event.target)) {
        // Clicked outside of element
        handler(event);
      }
    };

    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;
