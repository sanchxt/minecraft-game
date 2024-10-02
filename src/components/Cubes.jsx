import React, { useCallback } from "react";
import { useStore } from "../hooks/useStore";
import { Cube } from "./Cube";

export const Cubes = () => {
  const cubes = useStore(useCallback((state) => state.cubes, []));

  return cubes.map(({ key, pos, texture }) => (
    <Cube key={key} position={pos} texture={texture} />
  ));
};
