import classNames from 'classnames';
import { serverTimestamp } from 'firebase/firestore';
import { useFormik } from 'formik';
import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import * as Yup from 'yup';

import {
  AppState,
  IFirestorePostPayload,
  createPost,
  useAppSelector,
} from '@bloggo/redux';
import {
  AppLayout,
  AuthCheck,
  Button,
  FormFeedback,
  Input,
  Label,
  Metatags,
  PortalNavbar,
  Toast,
  ToastProps,
} from '@bloggo/ui';

const PostSlugSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short.')
    .max(50, 'Title is too long.')
    .required('Title is required.'),
});

const CreatePostPage: React.FC = () => {
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
  const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
    useFormik({
      validationSchema: PostSlugSchema,
      initialValues: { title: '' },
      onSubmit: async ({ title }) => {
        try {
          const slug = encodeURI(kebabCase(title));
          if (user?.uid) {
            const postPayload: IFirestorePostPayload = {
              title,
              slug,
              content:
                '# Welcome to my blog!\n\nThis is a sample post. Feel free to edit it and delete it.\n\n---\n\n<!--more-->',
              description: 'Welcome to my blog!',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              href: `${username}/${slug}`,
              likeCount: 0,
              published: false,
              thumbnail:
                'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
              uid: user.uid,
              username,
            };
            createPost(user.uid, slug, postPayload);
            setToast({
              isOpen: true,
              toggle: () =>
                setToast((prevToast) => ({ ...prevToast, isOpen: false })),
              text: {
                heading: 'Post created!',
                body: 'Post has been created. Proceed to edit it.',
              },
              type: 'success',
            });
            setTimeout(() => {
              router.push(`/portal/${slug}`);
            }, 500);
          }
        } catch (error) {
          console.error(error);
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
  return (
    <>
      <Metatags title="Create Post" />
      <AppLayout
        heading="Dashboard"
        headingEmoji="⚙"
        subHeading="View your dashboard, manage your posts, edit password and profile"
      >
        <AuthCheck>
          <section className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
            {/* NAVBAR */}
            <PortalNavbar />
            <div className="border border-neutral-100 dark:border-neutral-800 md:hidden" />

            <div className="flex-grow">
              <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                <form
                  className="grid md:grid-cols-2 gap-6"
                  onSubmit={handleSubmit}
                >
                  <label className="block md:col-span-2">
                    {touched.title && errors.title && (
                      <FormFeedback
                        type="error"
                        message={errors.title}
                      ></FormFeedback>
                    )}
                    <Label>
                      <span data-tip="Note: this will determine the unique url for this post.">
                        Post Title *
                      </span>
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Post title"
                      className={classNames(
                        'mt-1',
                        'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      required
                      min={3}
                      max={50}
                    />
                  </label>
                  <Button primary className="md:col-span-2" type="submit">
                    Create post
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </AuthCheck>
      </AppLayout>

      <ReactTooltip />
      <Toast {...toast} />
    </>
  );
};

export default CreatePostPage;
