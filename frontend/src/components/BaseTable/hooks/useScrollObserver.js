import { useEffect, useRef, useCallback } from "react";

const useScrollObserver = ({
  onIntersect,
  threshold = 0.1,
  enabled = true,
}) => {
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && enabled) {
        onIntersect();
      }
    },
    [onIntersect, enabled]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin: "50px", // Trigger 50px before reaching the target
    });

    observerRef.current.observe(target);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, threshold, enabled]);

  return targetRef;
};

export default useScrollObserver;
