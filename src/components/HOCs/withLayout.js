import React, { useState } from 'react';
import Header from '../Layout/Header/header';
import Body from '../Layout/Body/body';
import Footer from '../Layout/Footer/footer';
import useUser from '../../libs/use-user';

const withLayout = (Component) => (props) =>
  (function WithLayout() {
    const { login, logout, user } = useUser();
    return (
      <>
        <Header user={user} login={login} logout={logout} />
        <Body>
          <Component user={user} login={login} {...props} />
        </Body>
        <Footer />
      </>
    );
  })();

export default withLayout;
