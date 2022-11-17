import { FC, forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: JSX.Element;
  icon?: JSX.Element;
  error?: String;
  ref: any;
}

const Input: FC<InputProps> = forwardRef((props, ref): JSX.Element => {
  const hideIcon = useRef(false);

  useEffect(() => {
    if (props.value !== '' && props.value !== undefined) {
      console.log('value', props.value);
      hideIcon.current = true;
    }
  }, []);

  return (
    <div className='flex flex-col content-center justify-centerw-full gap-y-2'>
      <div className="bg-[#000022]/10 hover:ring-2 ring-[#65A46D] ring-offset-2 ring-offset-[#FBF5F3] w-full md:w-[80%] m-auto inline-flex content-center gap-x-2 py-2 px-3 rounded-lg shadow-md transition-all easy-in-out duration-300">
        {hideIcon && props.icon}
        <input
          className="w-full h-full rounded-lg p-2 outline-0 bg-transparent"
          {...props}
          {...ref}
        />
      </div>
      {props.error && (
        <p className="text-red-500 text-lg w-full md:w-[80%] mx-auto px-3">{props.error as string} ❗</p>
      )}
    </div>
  );
});

export default Input;
