import React, { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";
import GeneralTextStyles from "../../theme/typography";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      className={classNames(
        styles["input"],
        GeneralTextStyles.buttonText,
        props.className
      )}
    />
  );
};
