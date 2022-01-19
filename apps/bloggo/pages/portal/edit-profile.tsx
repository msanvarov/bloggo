import React from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';
import {
  AppLayout,
  AuthCheck,
  Button,
  Input,
  Label,
  Metatags,
  PortalNavbar,
} from '@bloggo/ui';

const EditProfilePage: React.FC = () => {
  const { username } = useAppSelector((state: AppState) => state.user);
  return (
    <>
      <Metatags title="Edit Profile" />
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
                  action="#"
                  method="post"
                >
                  <label className="block md:col-span-2">
                    <Label>Username</Label>
                    <Input
                      placeholder="@sal"
                      type="text"
                      className="mt-1"
                      value={username}
                    />
                  </label>
                  <label className="block">
                    <Label>Current password</Label>
                    <Input
                      type="password"
                      placeholder="password"
                      className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>New password</Label>
                    <Input
                      type="password"
                      className="mt-1"
                      placeholder="password"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <Label> Email address</Label>
                    <Input
                      type="email"
                      placeholder="sal@dezzign.studio"
                      className="mt-1"
                    />
                  </label>
                  <Button primary className="md:col-span-2" type="submit">
                    Modify profile
                  </Button>
                </form>
              </div>
            </div>
          </section>
        </AuthCheck>
      </AppLayout>
    </>
  );
};

export default EditProfilePage;
