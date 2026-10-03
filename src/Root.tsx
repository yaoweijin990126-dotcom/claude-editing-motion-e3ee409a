import { Composition } from "remotion";
import { EditingMotion } from "./EditingMotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EditingMotion"
        component={EditingMotion}
        durationInFrames={900}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
