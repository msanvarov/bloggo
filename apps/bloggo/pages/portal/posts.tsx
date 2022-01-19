import { QueryDocumentSnapshot } from 'firebase/firestore';
import React from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';
import {
  AppLayout,
  AuthCheck,
  Metatags,
  PortalNavbar,
  UserPostsList,
} from '@bloggo/ui';

const PostsPage: React.FC = () => {
  const {
    user: { uid },
  } = useAppSelector((state: AppState) => state.user);

  return (
    <>
      <Metatags title="User Posts" />
      <AppLayout
        heading="Portal"
        headingEmoji="⚙"
        subHeading="Manage posts, edit profile and password"
      >
        <AuthCheck>
          <section className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
            <PortalNavbar />
            <div className="border border-neutral-100 dark:border-neutral-800 md:hidden" />
            <div className="flex-grow">
              <div className="flex flex-col space-y-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
                    <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                          <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                            <th scope="col" className="px-6 py-3">
                              Post
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>

                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        {uid && <UserPostsList {...{ uid }} />}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AuthCheck>
      </AppLayout>
    </>
  );
};

export default PostsPage;
