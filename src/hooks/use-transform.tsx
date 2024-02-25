import { useState } from "react";
export default function useTransform() {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const rotateTransform = (
    coordinates: { x: number; y: number },
    maxDeg: number,
    card: HTMLElement
  ) => {
    const size = {
      width: card.offsetWidth,
      height: card.offsetHeight,
    };

    function createDeg(
      deg: number,
      distance: number,
      location: number,
      axis: string
    ) {
      const center = distance / 2;
      const unit = deg / center;
      let address = 0;

      if (location >= center) {
        address = location - center;
        return axis === "x" ? -(address * unit) : address * unit;
      }

      if (location <= center) {
        address = center - location;
        return axis === "x" ? address * unit : -(address * unit);
      }
      return 0;
    }

    const x = createDeg(maxDeg, size.height, coordinates.y, "x");
    const y = createDeg(maxDeg, size.width, coordinates.x, "y");

    setTransform({ x, y });
  };

  const removeTransform = () => {
    setTransform({ x: 0, y: 0 });
  };

  return { transform, rotateTransform, removeTransform };
}
