import React from "react";
import "./RegularButton.css";
import GeneralTextStyles from "../../theme/typography";

export type ButtonSize = "small" | "big";
export type ButtonVariant =
  | "default"
  | "primary500"
  | "primary50"
  | "danger500"
  | "danger50";

export interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  outlined: boolean;
}

const VARIANT_CLASS = {
  ["primary500"]: "regular-button--primary500",
  ["primary50"]: "regular-button--primary50",
  ["danger500"]: "regular-button--danger500",
  ["danger50"]: "regular-button--danger50"
};

const VARIANT_CLASS_OUTLINED = {
  ["primary500"]: "regular-button--primary500-outlined",
  ["primary50"]: "regular-button--primary50-outlined",
  ["danger500"]: "regular-button--danger500-outlined",
  ["danger50"]: "regular-button--danger50-outlined"
};

const RegularButton: React.FC<RegularButtonProps> = ({
  title,
  variant = "primary500",
  className,
  disabled,
  outlined,
  ...props
}) => {
  const getVariantClass = () => {
    return outlined ? VARIANT_CLASS_OUTLINED[variant] : VARIANT_CLASS[variant];
  };

  const outlinedMainClass = outlined ? "regular-button--outlined" : "";

  const buttonClass = `regular-button ${outlinedMainClass} ${GeneralTextStyles.buttonText} ${className ? `${className}` : ""} ${getVariantClass()}`;

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      <span className={`regular-button__wrapper-with-icons`}>
        <span className={GeneralTextStyles.buttonText}>{title}</span>
      </span>
    </button>
  );
};

export default RegularButton;
