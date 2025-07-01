import { Loader2 } from "lucide-react";

type LoaderProps = {
  size?: number; // in pixels
};

const Loader: React.FC<LoaderProps> = ({ size = 24 }) => {
  return <Loader2 className=" animate-spin text-indigo-500" size={size} />;
};

export default Loader;
