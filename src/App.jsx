import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Cubes } from "./components/Cubes";

function App() {
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Cubes />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
    </>
  );
}

export default App;
