import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref.
 * Inspired by https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  outsideClickHandler: (event: MouseEvent) => any
) {
  /**
   * Alert if clicked on outside of element
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      outsideClickHandler(event);
    }
  }; // handleClickOutside

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
} // useOutsideAlerterer
