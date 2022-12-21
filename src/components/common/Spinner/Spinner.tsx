import s from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 14 }: SpinnerProps) => {
  return (
    <span
      className={s.loader}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></span>
  );
};

export default Spinner;
