import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLInputElement>,
  handler: (event: Event) => void,
  exceptions?: RefObject<HTMLInputElement> | RefObject<HTMLInputElement>[]
) => {
  useEffect(() => {
    // Detect if clicked outside of element
    const handleClickOutside = (event: any) => {
      if (ref.current?.contains(event.target)) {
        return;
      }

      if (exceptions) {
        if (Array.isArray(exceptions)) {
          for (let i = 0; i < exceptions.length; i++) {
            if (exceptions[i].current?.contains(event.target)) {
              return;
            }
          }
        } else {
          if (exceptions.current?.contains(event.target)) {
            return;
          }
        }
      }

      // Clicked outside of element
      handler(event);
    };

    // Bind event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, exceptions]);
};

export default useClickOutside;
