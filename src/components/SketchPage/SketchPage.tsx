import { useParams } from "react-router-dom";

const SketchPage = () => {
  const { sketchName } = useParams();
  return <div>SketchPage {sketchName}</div>;
};

export default SketchPage;
