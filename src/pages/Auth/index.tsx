import { FC, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Key from '../../Icon/Key';
import Mail from '../../Icon/Mail';
import Apple from '../../Icon/Social/Apple';
import Facebook from '../../Icon/Social/Facebook';
import Google from '../../Icon/Social/Google';
import Snapchat from '../../Icon/Social/Snapchat';
import useScreenSize from '../../hooks/screen';

const schemaLogin = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .required();

type LoginData = z.infer<typeof schemaLogin>;

const schemaRegister = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .required()
  .superRefine(
    (
      {
        password,
        confirmPassword,
      }: { password: String; confirmPassword: String },
      ctx: z.RefinementCtx,
    ) => {
      if (password !== confirmPassword) {
        console.log('password', password, '\nconfirmPassword', confirmPassword);
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match',
          path: ['confirmPassword'],
          fatal: true,
        });
        return z.INVALID;
      }
    },
  );

type RegisterData = z.infer<typeof schemaRegister>;

const AuthPage: FC = (): JSX.Element => {
  const { validation } = useScreenSize({ validation: (w, h) => w > 1100 });
  const [type, setType] = useState('login');
  const navigate = useNavigate();

  const LoginComponent: FC = (): JSX.Element => {
    const {
      register,
      handleSubmit,
      formState: { errors, isValidating, isSubmitting },
      watch,
      clearErrors,
    } = useForm<LoginData>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(schemaLogin),
    });
    const watchAllFields = watch();
    const [historyWacthAllFields, setHistoryWacthAllFields] = useState({});

    useEffect(() => {
      console.log('watchAllFields', watchAllFields);
      if (historyWacthAllFields !== watchAllFields && isSubmitting) {
        setHistoryWacthAllFields(watchAllFields);
        clearErrors();
      }
    }, [watchAllFields]);

    const onSubmit: SubmitHandler<LoginData> = (data) => {
      console.log(
        'data: ',
        data,
        '\nerrors: ',
        errors,
        '\nvalid: ',
        isValidating,
      );
      navigate('/app/1');
    };

    return (
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={<Mail className="w-6" />}
          placeholder="Email"
          type="email"
          autoComplete="on"
          // name="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          error={errors.email?.message as String}
          ref={register('email')}
        />
        <Input
          icon={<Key className="w-6" />}
          placeholder="Password"
          type="password"
          autoComplete="on"
          // name="password"
          aria-invalid={errors.password ? 'true' : 'false'}
          error={errors.password?.message as String}
          ref={register('password')}
        />
        <p
          className="text-right mr-2 md:mr-[12%] text-lg text-slate-500"
          onClick={handlerForgotPassword}
        >
          forgot password ? 🤔
        </p>
        <Button type="submit">
          <p className="px-5">Login</p>
        </Button>
      </form>
    );
  };

  const RegisterComponent: FC = (): JSX.Element => {
    const {
      register,
      handleSubmit,
      formState: { errors, isValidating, isSubmitting },
      watch,
      clearErrors,
      resetField,
    } = useForm<RegisterData>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: zodResolver(schemaRegister),
      delayError: 1000,
    });
    const watchAllFields = watch();
    const [historyWacthAllFields, setHistoryWacthAllFields] = useState({});

    useEffect(() => {
      console.log('watchAllFields', watchAllFields);
      if (
        (historyWacthAllFields !== watchAllFields && isSubmitting) ||
        isValidating
      ) {
        setHistoryWacthAllFields(watchAllFields);
        resetField('password');
        resetField('confirmPassword');
        clearErrors();
      }
    }, [watchAllFields]);

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
      console.log(
        'data: ',
        data,
        '\nerrors: ',
        errors,
        '\nvalid: ',
        isValidating,
      );
      navigate('/app/1');
    };

    return (
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          icon={<Mail className="w-6" />}
          placeholder="Email"
          type="email"
          autoComplete="on"
          name="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          error={errors.email?.message as String}
          ref={register('email')}
        />
        <Input
          icon={<Key className="w-6" />}
          placeholder="Password"
          type="password"
          autoComplete="on"
          name="password"
          aria-invalid={errors.password ? 'true' : 'false'}
          error={errors.password?.message as String}
          ref={register('password')}
        />
        <Input
          {...register('confirmPassword')}
          icon={<Key className="w-6" />}
          placeholder="Confirm password"
          type="password"
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          error={errors.confirmPassword?.message as String}
          ref={register('confirmPassword')}
        />
        <Button type="submit">
          <p className="px-5">Register</p>
        </Button>
      </form>
    );
  };

  const [counter, setCounter] = useState(Math.floor(Math.random() * 100000000));

  const addSpaceEachThreeDigits = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handlerSignUp = () => {
    if (type === 'login') {
      setType('signup');
    } else {
      setType('login');
    }
  };

  const handlerForgotPassword = () => {
    console.log('Forgot password');
  };

  const AuthForm = (): JSX.Element => (
    <div className="flex flex-col justify-between justify-items-center p-8 col-span-1 row-span-1">
      <div>
        <h1 className="text-4xl my-4 text-left font-bold text-blue-600">
          Welcome back 👋
        </h1>
        <p className="text-2xl text-left text-slate-500">
          We happy to see you again. To use your account should log in first !
        </p>
      </div>
      <div className="flex flex-col gap-y-4 text-xl">
        {type === 'login' ? <LoginComponent /> : <RegisterComponent />}
        {type === 'login' ? (
          <p className="text-center text-slate-800">
            What, you don't have an account 😮 !{' '}
            <a
              className="text-blue-500 hover:underline"
              onClick={handlerSignUp}
            >
              Sign up
            </a>
          </p>
        ) : (
          <p className="text-center text-slate-800">
            Already have an account ?{' '}
            <a
              className="text-blue-500 hover:underline"
              onClick={handlerSignUp}
            >
              Log in
            </a>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="inline-flex">
          <div className="h-1 flex-0 w-full bg-[#000022]/10 rounded-lg mx-2 my-auto" />
          <p className="flex-1 whitespace-nowrap text-xl">
            blazingly fast login 🚀
          </p>
          <div className="h-1 flex-0 w-full bg-[#000022]/10 rounded-lg mx-2 my-auto" />
        </div>
        <div className="inline-flex justify-center gap-4">
          <Button>
            <Facebook className="w-8 h-8 md:w-10 md:h-10 my-auto group-hover:fill-blue-500 group-hover:stroke-blue-500 transition-all duration-500 ease-in-out" />
          </Button>

          <Button>
            <Google className="w-8 h-8 md:w-10 md:h-10 my-auto group-hover:fill-red-500 group-hover:stroke-red-500 transition-all duration-500 ease-in-out" />
          </Button>

          <Button>
            <Snapchat className="w-8 h-8 md:w-10 md:h-10 my-auto group-hover:fill-yellow-500 group-hover:stroke-yellow-500 transition-all duration-500 ease-in-out" />
          </Button>

          <Button>
            <Apple className="w-8 h-8 md:w-10 md:h-10 my-auto group-hover:fill-black group-hover:stroke-black transition-all duration-500 ease-in-out" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {validation ? (
        <div>
          <div className="grid grid-cols-2 grid-rows-1 w-full h-full">
            <div className="col-span-1 row-span-1 bg-[url('/nasa.jpg')] bg-no-repeat bg-cover bg-center text-center text-2xl rounded-r-2xl shadow-xl">
              <div className="mx-4 my-10">
                <p className="text-white text-4xl font-semibold">
                  KronosSecureMessenger's progress in world domination. 😁
                </p>
                <p className="text-white text-4xl oldstyle-nums slashed-zero my-4">
                  {addSpaceEachThreeDigits(counter)} 🚀
                </p>
              </div>

              <div className="w-1 h-[90%] bg-[#000022]/10 rounded-lg absolute inset-x-2/4 inset-y-[5%]" />
            </div>
            <AuthForm />
          </div>
        </div>
      ) : (
        <AuthForm />
      )}
    </>
  );
};

export default AuthPage;
