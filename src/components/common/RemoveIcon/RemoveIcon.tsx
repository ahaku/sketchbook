import { IconBaseProps } from "react-icons";
import { AiFillDelete } from "react-icons/ai";

const RemoveIcon = ({ ...rest }: IconBaseProps) => {
  return <AiFillDelete {...rest} />;
};

export default RemoveIcon;
