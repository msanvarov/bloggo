import classnames from 'classnames';
import { useFormik } from 'formik';
import { debounce } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';

import {
  AppState,
  checkUsername,
  createUsernameWithUserData,
  useAppSelector,
} from '@bloggo/redux';
import {
  AppLayout,
  Button,
  FormFeedback,
  Input,
  Metatags,
  Toast,
  ToastProps,
} from '@bloggo/ui';

const UsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short.')
    .required('Username is required.'),
});

const EnterPage: React.FC = () => {
  const router = useRouter();
  const { user, username } = useAppSelector((state: AppState) => state.user);
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
    setFieldError,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: UsernameSchema,
    initialValues: { username: '' },
    onSubmit: async ({ username }) => {
      try {
        createUsernameWithUserData({
          uid: user.uid,
          username,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
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
    if (user && username) {
      router.replace('/');
    }
  }, [user, username]);

  const lookupUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const exists = await checkUsername(username);
        console.log('Firestore read executed!', exists);
        exists && setFieldError('username', 'That username has been taken.');
      }
    }, 500),
    [],
  );
  return (
    <>
      <Metatags title="Finish Registration" />
      <AppLayout
        subHeading="Become a part of the Bloggo family."
        headingEmoji="🎉"
        heading="Finish Registration"
      >
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {touched.username && errors.username && (
              <FormFeedback
                type="error"
                message={errors.username}
              ></FormFeedback>
            )}
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="sal"
                className={classnames('mt-1', {
                  'border-pink-500 text-pink-600':
                    touched.username && errors.username,
                })}
                onChange={(e) => {
                  handleChange(e);
                  // side effect to check for existing usernames
                  lookupUsername(e.target.value);
                }}
                onBlur={handleBlur}
                value={values.username}
                required
              />
            </label>

            <Button
              primary
              type="submit"
              //   disabled={Object.keys(errors).length === 0}
            >
              Continue
            </Button>
          </form>
        </div>
      </AppLayout>

      <Toast {...toast} />
    </>
  );
};

export default EnterPage;
