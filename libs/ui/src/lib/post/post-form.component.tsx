import classNames from 'classnames';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { draftjsToMd, mdToDraftjs } from 'draftjs-md-converter';
import {
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import * as Yup from 'yup';

import { IFirestorePostData } from '@bloggo/redux';

import { Button } from '../buttons';
import { FormFeedback, FormSelect } from '../forms';
import { ImageUploader } from '../image-uploader.component';
import { Input } from '../input.component';
import { Label } from '../label.component';
import { Toast, ToastProps } from '../toast.component';

type PostFormProps = {
  defaultValues: Data<IFirestorePostData>;
  postRef: DocumentReference<DocumentData>;
};

const PostFormSchema = Yup.object().shape({
  title: Yup.string().required('Title field is required.'),
  description: Yup.string().required('Description field is required.'),
  published: Yup.string().required('Published field is required.'),
});

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

export const PostForm: React.FC<PostFormProps> = ({
  defaultValues,
  postRef,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(
      convertFromRaw(mdToDraftjs(defaultValues.content)),
    ),
  );
  const [toast, setToast] = useState<ToastProps>({
    isOpen: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggle: () => {},
    text: {
      heading: '',
      body: '',
    },
  });

  console.log(defaultValues);

  const { handleChange, handleBlur, handleSubmit, errors, touched, values } =
    useFormik({
      validationSchema: PostFormSchema,
      initialValues: {
        title: defaultValues.title,
        description: defaultValues.description,
        published: defaultValues.published.toString(),
      },
      onSubmit: async ({ title, description, published }) => {
        try {
          await updateDoc(postRef, {
            title,
            description,
            content: getMarkdownContent(),
            published: JSON.parse(published) as boolean,
            updatedAt: serverTimestamp(),
          });

          setToast({
            isOpen: true,
            toggle: () =>
              setToast((prevToast) => ({ ...prevToast, isOpen: false })),
            text: {
              heading: 'Post edited',
              body: 'You have successfully edited the post.',
            },
            type: 'success',
          });
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
        }
        setTimeout(() => {
          setToast((prevToast) => ({ ...prevToast, isOpen: false }));
        }, 2000);
      },
    });

  const getMarkdownContent = () =>
    draftjsToMd(convertToRaw(editorState.getCurrentContent()));

  return (
    <>
      <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6 mb-6">
        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <label className="block md:col-span-2">
            {touched.title && errors.title && (
              <FormFeedback type="error" message={errors.title}></FormFeedback>
            )}
            <Label>Title *</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Post Title"
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
          <label className="block md:col-span-2">
            {touched.description && errors.description && (
              <FormFeedback
                type="error"
                message={errors.description}
              ></FormFeedback>
            )}
            <Label>Post Excerpt</Label>

            <textarea
              id="description"
              name="description"
              className={classNames(
                `block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`,
                'mt-1',
                'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
              )}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              rows={4}
            ></textarea>
            <p className="mt-1 text-sm text-neutral-500">
              Brief description for your article. URLs are hyperlinked.
            </p>
          </label>

          <div className="block md:col-span-2">
            <Label>Featured Image</Label>
            <ImageUploader {...{ postRef }} />
          </div>
          <label className="block md:col-span-2">
            <Label>Post Content</Label>

            <Editor
              editorState={editorState}
              editorClassName="mt-1 border-2"
              onEditorStateChange={(editor: EditorState) =>
                setEditorState(editor)
              }
            />
          </label>
          <label className="block">
            <FormSelect
              name="published"
              className="mt-1"
              value={values.published}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="false" label="Not Published" />
              <option value="true" label="Published" />
            </FormSelect>
          </label>
          <Button primary className="md:col-span-2" type="submit">
            Persist changes
          </Button>
        </form>
      </div>

      <Toast {...toast} />
    </>
  );
};
