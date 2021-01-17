import React from 'react';
import Profile from '../../components/Profile/profile';
import { string, func } from 'prop-types';
import page from '../../components/HOCs/page';

const ProfilePage = ({ user = '' } = {}) => <Profile user={user} />;

ProfilePage.propTypes = {
  user: string,
  setUser: func,
};

export default page(ProfilePage);
