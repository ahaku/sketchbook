import s from "./LoadingText.module.scss";

interface Props {
  text?: string;
}

const LoadingText = ({ text = "Loading" }: Props) => {
  return <span className={s.loading}>{text}</span>;
};

export default LoadingText;
