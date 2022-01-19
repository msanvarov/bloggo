import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';
import { AppLayout, AuthCheck, Metatags, PostEdit } from '@bloggo/ui';

const PortalEditPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user } = useAppSelector((state: AppState) => state.user);

  return (
    <>
      <Metatags title="Portal Edit Post" />
      <AppLayout basicLayout>
        <AuthCheck>
          <section className="pt-8 lg:pt-16">
            {user?.uid && <PostEdit {...{ uid: user.uid, slug }} />}
          </section>
        </AuthCheck>
      </AppLayout>
    </>
  );
};

export default PortalEditPostPage;
