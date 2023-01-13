import { useEffect } from "react";

/**
 * Hook to declaratively block window scrolling. Attaches an EventListener to
 * the `scroll` window event, incercepting and fundamentally blocking the event.
 * Removes listener whenever `shouldBlockScroll` is set to `false` or the component
 * making use of this hook is unmounted.
 * @param shouldBlockScroll whether window scrolling should be blocked.
 * @example
 * ```
 * const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
 *
 * // will prevent scrolling whenever popUpOpen is set to true.
 * useScrollBlock(popUpOpen);
 * ```
 */
export function useScrollBlock(shouldBlockScroll: boolean) {
  const noScroll = () => {
    window.scrollTo(0, 0);
  }; // noScroll

  useEffect(() => {
    if (shouldBlockScroll) {
      window.addEventListener("scroll", noScroll);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("scroll", noScroll);
      document.body.style.overflow = "visible";
    }

    return () => window.removeEventListener("scroll", noScroll);
  }, [shouldBlockScroll]); // useEffect
} // useScrollBlock
