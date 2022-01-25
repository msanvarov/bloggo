import {
  DocumentData,
  DocumentReference,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { sha256 } from 'js-sha256';
import React, { useState } from 'react';

import {
  AppState,
  STATE_CHANGED,
  storage,
  useAppSelector,
} from '@bloggo/redux';

import { ImageContainer } from './image/image-container.component';

type ImageUploaderProps = {
  postRef: DocumentReference<DocumentData>;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ postRef }) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('0');
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);

  //   TODO: Hash the whole file before uploading to remove duplicate images
  const uploadFile = async (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      //   Get the file.
      const file = Array.from(e.currentTarget.files)[0];
      const extension = file.type.split('/')[1];

      if (user?.uid) {
        // Makes reference to the storage bucket location
        const fileRef = ref(
          storage,
          `uploads/${user.uid}/${sha256(file.name)}.${extension}`,
        );
        setUploading(true);

        // Starts the upload
        const task = uploadBytesResumable(fileRef, file);

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
          const pct = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);
          setProgress(pct);
        });

        // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
        task
          .then(() => getDownloadURL(fileRef))
          .then((url) => {
            //  Setting the thumbnail image
            updateDoc(postRef, {
              thumbnail: url,
              updatedAt: serverTimestamp(),
            });
            setImagePreviewURL(url as string);
            setUploading(false);
          });
      }
    }
  };
  return (
    <>
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
                onChange={uploadFile}
                accept="image/*"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 2MB</p>
          {uploading && <p className="text-lg text-neutral-500">{progress}%</p>}
        </div>
      </div>
      {imagePreviewURL && (
        <div className="relative rounded-xl overflow-hidden">
          <ImageContainer
            containerClassName="aspect-w-6 aspect-h-5"
            className="object-cover w-full h-full rounded-xl"
            src={imagePreviewURL}
            prevImageHorizontal
          />
        </div>
      )}
    </>
  );
};
