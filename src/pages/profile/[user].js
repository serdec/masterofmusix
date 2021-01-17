import React, { useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import page from '../../components/HOCs/page';
import Profile from '../../components/Profile/profile';

const noop = () => { };

const ProfilePage = ({ user = '' } = {}) => {
  return <Profile user={user} />;
};

ProfilePage.propTypes = {
  user: string,
  setUser: func,
};
export default page(ProfilePage);
