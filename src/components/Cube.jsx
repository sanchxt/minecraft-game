import React, { useState, useCallback, useMemo } from "react";
import { useBox } from "@react-three/cannon";
import { useStore } from "../hooks/useStore";
import * as textures from "../assets/textures";
import * as THREE from "three";

export const Cube = React.memo(({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const addCube = useStore(useCallback((state) => state.addCube, []));
  const removeCube = useStore(useCallback((state) => state.removeCube, []));

  const activeTexture = textures[texture + "Texture"];

  const geometry = useMemo(() => new THREE.BoxGeometry(), []);

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    setIsHovered(true);
  }, []);

  const handlePointerOut = useCallback((e) => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const clickedFace = Math.floor(e.faceIndex / 2);
      const { x, y, z } = ref.current.position;
      if (e.altKey) {
        removeCube(x, y, z);
      } else {
        const positions = [
          [x + 1, y, z],
          [x - 1, y, z],
          [x, y + 1, z],
          [x, y - 1, z],
          [x, y, z + 1],
          [x, y, z - 1],
        ];
        if (clickedFace >= 0 && clickedFace < 6) {
          addCube(...positions[clickedFace]);
        }
      }
    },
    [ref, addCube, removeCube]
  );

  return (
    <mesh
      geometry={geometry}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
      ref={ref}
    >
      <meshStandardMaterial
        color={isHovered ? "grey" : "white"}
        map={activeTexture}
        transparent={texture === "glass"}
        opacity={texture === "glass" ? 0.6 : 1}
      />
    </mesh>
  );
});
