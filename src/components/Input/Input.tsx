import React, { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input {...props} className={styles["input"]} />;
};