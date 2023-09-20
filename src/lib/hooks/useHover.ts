import { useState } from "react";

export function useHover() {
  const [hovering, setHovering] = useState(false);
  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);


  return {
    hovering,
    bind: {
      onMouseOver,
      onMouseOut
    }
  } as const;
};
