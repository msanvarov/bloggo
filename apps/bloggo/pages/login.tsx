import classnames from 'classnames';
import { useFormik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import * as Yup from 'yup';

import {
  AppState,
  login,
  loginWithGoogleProvider,
  useAppSelector,
} from '@bloggo/redux';
import {
  AppLayout,
  Button,
  FormFeedback,
  Input,
  Link,
  Toast,
  ToastProps,
} from '@bloggo/ui';

export const oauthProviders = [
  {
    name: 'Continue with Google',
    icon: '/google.svg',
    onClick: async (cb: () => void) => {
      await loginWithGoogleProvider();
      cb();
    },
  },
];

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid.')
    .required('Email field is required.'),
  password: Yup.string()
    .min(8, 'Password is too short.')
    .max(32, 'Password is too long.')
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      'Password must contain at least one number, one lowercase and one uppercase letter.',
    )
    .required('Password field is required.'),
});

// TODO: provide a default account for users to test with (set initial values for formik with actual login credentials)
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAppSelector((state: AppState) => state.user);
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastProps>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggle: () => {},
    text: {
      heading: '',
      body: '',
    },
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: '', password: '' },
    onSubmit: async ({ email, password }) => {
      try {
        login(email, password);
        setToast({
          isOpen: true,
          toggle: () =>
            setToast((prevToast) => ({ ...prevToast, isOpen: false })),
          text: {
            heading: 'Login completed',
            body: 'You have successfully logged in. Welcome back!',
          },
          type: 'success',
        });
      } catch (error) {
        setToast({
          isOpen: true,
          toggle: () =>
            setToast((prevToast) => ({ ...prevToast, isOpen: false })),
          text: {
            heading: 'Login failed',
            body: 'Please check your credentials and try again.',
          },
          type: 'error',
        });
        setTimeout(() => {
          setToast((prevToast) => ({ ...prevToast, isOpen: false }));
        }, 2000);
      }
    },
  });

  // redirect to home page if user is logged in
  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Login || Bloggo</title>
      </Head>
      <AppLayout
        subHeading="Welcome to Bloggo - a blogging platform."
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-4">
            {oauthProviders.map((item, index) => (
              <a
                key={index}
                onClick={() => item.onClick(() => router.replace('/enter'))}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {touched.email && errors.email && (
              <FormFeedback type="error" message={errors.email}></FormFeedback>
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="sal@dezzign.studio"
                className={classnames(
                  'mt-1',
                  'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
                )}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                required
              />
            </label>
            {touched.password && errors.password && (
              <FormFeedback
                type="error"
                message={errors.password}
              ></FormFeedback>
            )}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                {touched.password ? (
                  <p
                    className="text-sm"
                    onClick={() => setRevealPassword(!revealPassword)}
                  >
                    {revealPassword ? <FiEyeOff /> : <FiEye />}
                  </p>
                ) : (
                  <Link href="/forgot-password" className="text-sm">
                    Forgot password?
                  </Link>
                )}
              </span>
              <Input
                type={revealPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={classnames(
                  'mt-1',
                  'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
                )}
                onInput={() => setFieldTouched('password', true, true)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
            </label>

            <Button primary type="submit">
              Continue
            </Button>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Not part of Bloggo? {` `}
            <Link href="/register">Register with Bloggo</Link>
          </span>
        </div>
      </AppLayout>
      <Toast {...toast} />
    </>
  );
};

export default LoginPage;
