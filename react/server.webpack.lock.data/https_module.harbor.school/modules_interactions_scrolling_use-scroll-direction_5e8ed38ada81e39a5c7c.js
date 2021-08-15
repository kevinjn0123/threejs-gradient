const React = window.React;
export const SCROLL_DIRECTION = {
  UP: "up",
  DOWN: "down"
};
export function useScrollDirection(option) {
  const {initialDirection, thresholdPixels, off} = option;
  const [scrollDir, setScrollDir] = React.useState(initialDirection);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const threshold = thresholdPixels || 0;
    const target = ref.current || window;
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    const updateScrollDir = () => {
      const scrollY = target === window ? target.pageYOffset : target.scrollTop;
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? SCROLL_DIRECTION.DOWN : SCROLL_DIRECTION.UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };
    !off ? target.addEventListener("scroll", onScroll) : setScrollDir(initialDirection);
    return () => target.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels, off]);
  return [scrollDir, ref];
}
