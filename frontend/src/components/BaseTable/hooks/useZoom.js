import { useRef, useState, useEffect } from "react";

function useZoom({ min = 0.5, max = 2, step = 0.1, zoomKey = "z" } = {}) {
  const zoomRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [wrapperStyle, setWrapperStyle] = useState({});
  const zoomKeyPressed = useRef(false);

  const zoomIn = () => setScale((prev) => Math.min(prev + step, max));
  const zoomOut = () => setScale((prev) => Math.max(prev - step, min));
  const resetZoom = () => setScale(1);

  // Theo dõi kích thước và scale
  useEffect(() => {
    if (!zoomRef.current) return;
    const el = zoomRef.current;

    const updateSize = () => {
      const realWidth = el.offsetWidth;
      const realHeight = el.offsetHeight;

      setWrapperStyle({
        width: `${realWidth * scale}px`,
        height: `${realHeight * scale}px`,
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(el);
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [scale]);

  // Lắng nghe tổ hợp phím + cuộn chuột
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === zoomKey.toLowerCase()) {
        zoomKeyPressed.current = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === zoomKey.toLowerCase()) {
        zoomKeyPressed.current = false;
      }
    };

    const handleWheel = (e) => {
      if (zoomKeyPressed.current) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [zoomKey]);

  return {
    zoomRef,
    scale,
    wrapperStyle,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}

export default useZoom;
