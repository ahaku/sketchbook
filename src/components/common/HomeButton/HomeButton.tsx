import React from "react";
import s from "./HomeButton.module.scss";
import { Link } from "react-router-dom";
import HomeIcon from "../HomeIcon";
import { Paths as P } from "../../../paths";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const HomeButton = (props: Props) => {
  return (
    <div className={s.homeBtn} {...props}>
      <Link to={P.home}>
        <HomeIcon title="Home" />
      </Link>
    </div>
  );
};

export default HomeButton;
