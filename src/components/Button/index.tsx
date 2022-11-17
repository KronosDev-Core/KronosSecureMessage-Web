import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element;
  icon?: JSX.Element;
}

const Button: FC<ButtonProps> = (props): JSX.Element => (
  <button
    className="inline-flex justify-center self-center items-center w-fit gap-x-2 px-4 py-2 flex-1 rounded-lg shadow-md bg-[#000022]/10 hover:ring-2 ring-[#65A46D] ring-offset-2 ring-offset-[#FBF5F3] transition-all easy-in-out duration-300 group"
    {...props}
  >
    {props.icon}
    {props.children}
  </button>
);

export default Button;