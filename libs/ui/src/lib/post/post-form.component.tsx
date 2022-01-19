import classnames from 'classnames';
import { EditorState, convertToRaw } from 'draft-js';
import { draftjsToMd } from 'draftjs-md-converter';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';
import * as Yup from 'yup';

import { IFirestorePostData } from '@bloggo/redux';

import { Button } from '../buttons';
import { FormFeedback, FormSelect } from '../forms';
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
    EditorState.createEmpty(),
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
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik({
    validationSchema: PostFormSchema,
    initialValues: {
      title: defaultValues.title,
      description: '',
      published: '',
    },
    onSubmit: async ({ title, description, published }) => {
      try {
        console.log(defaultValues, title, description, content, published);
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
      <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
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
              className={classnames(
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
              className={classnames(
                `block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`,
                'mt-1',
                'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
              )}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              rows={4}
            ></textarea>
            <p className="mt-1 text-sm text-neutral-500">
              Brief description for your article. URLs are hyperlinked.
            </p>
          </label>
          {/* TODO: move to its own component with upload functionality */}
          <div className="block md:col-span-2">
            <Label>Featured Image</Label>

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </div>
            </div>
          </div>
          <label className="block">
            <Label> Post Content</Label>

            <Editor
              editorState={editorState}
              editorClassName="mt-1 border-2 "
              onEditorStateChange={(editor: EditorState) =>
                setEditorState(editor)
              }
            />
          </label>
          <label className="block">
            <Label> Preview</Label>

            <textarea
              className={classnames(
                `block w-full text-sm rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`,
                'mt-1',
                'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
              )}
              disabled
              value={draftjsToMd(convertToRaw(editorState.getCurrentContent()))}
            ></textarea>
          </label>
          <label className="block">
            <FormSelect
              className="mt-1"
              value={values.published}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="false">Not published</option>
              <option value="true">Published</option>
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
