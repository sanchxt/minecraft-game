import React, { useCallback } from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../assets/textures";
import { useStore } from "../hooks/useStore";

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const addCube = useStore(useCallback((state) => state.addCube, []));

  groundTexture.repeat.set(100, 100);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const [x, y, z] = Object.values(e.point).map((val) => Math.ceil(val));
      addCube(x, y, z);
    },
    [addCube]
  );

  return (
    <mesh onClick={handleClick} ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
