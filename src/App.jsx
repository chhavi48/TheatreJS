import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import {
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from "@theatre/r3f";
import FantasyBook from "./modelComponents/FantasyBook";

function App() {
  const sheet = getProject("Fly Through 9").sheet("Scene");
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={5}>
      <SheetProvider sheet={sheet}>
        <Scene />
        </SheetProvider>
      </ScrollControls>
      
      
      </Canvas>
    </>
  );
}

export default App;

function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  useFrame(() => {
    const seqleng = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * seqleng;
  });

  return (
    <>
      <color attach="background" args={["black"]} />

      <ambientLight />
      <FantasyBook />
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}
