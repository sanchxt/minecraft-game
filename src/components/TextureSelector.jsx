import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";
import { dirtImg, grassImg, glassImg, logImg, woodImg } from "../assets/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [localActiveTexture, setLocalActiveTexture] = useState("dirt");
  const setTexture = useStore((state) => state.setTexture);
  const { dirt, grass, glass, wood, log } = useKeyboard();
  const timeoutRef = useRef(null);

  console.log("TextureSelector rendered", { visible, localActiveTexture });

  const handleTextureChange = useCallback(
    (newTexture) => {
      console.log("handleTextureChange called", newTexture);
      setLocalActiveTexture(newTexture);
      setTexture(newTexture);
    },
    [setTexture]
  );

  useEffect(() => {
    console.log("Keyboard effect running");
    const textures = { dirt, grass, glass, wood, log };
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      handleTextureChange(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log, handleTextureChange]);

  useEffect(() => {
    console.log("Visibility effect running", localActiveTexture);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [localActiveTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img
              key={k}
              src={src}
              alt={k}
              className={`${k === localActiveTexture ? "active" : ""}`}
            />
          );
        })}
      </div>
    )
  );
};
