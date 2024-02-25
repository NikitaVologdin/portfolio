import { useState, useEffect } from "react";

export default function useGradient() {
  const [gradient, setGradient] = useState("");

  const moveGradient = (
    coordinates: { x: number; y: number },
    color: string
  ) => {
    setGradient(
      `radial-gradient(circle at ${coordinates.x}px ${coordinates.y}px, ${color}, transparent)`
    );
  };

  const removeGradient = () => {
    setGradient("");
  };

  return { gradient, moveGradient, removeGradient };
}
