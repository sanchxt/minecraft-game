import React, { useCallback } from "react";
import { useStore } from "../hooks/useStore";

export const Menu = () => {
  const saveWorld = useStore(useCallback((state) => state.saveWorld, []));
  const resetWorld = useStore(useCallback((state) => state.resetWorld, []));

  console.log("Menu rendered");

  const handleSave = useCallback(() => {
    console.log("Save clicked");
    saveWorld();
  }, [saveWorld]);

  const handleReset = useCallback(() => {
    console.log("Reset clicked");
    resetWorld();
  }, [resetWorld]);

  return (
    <div className="menu absolute">
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
