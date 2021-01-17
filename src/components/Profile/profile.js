import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { getUserScore } from '../../libs/user-apis';

const Profile = ({ user = '' } = {}) => {
  const [score, setScore] = useState();

  useEffect(() => {
    console.log({ user });
    setScore(getUserScore(user));
  }, [user]);

  return (
    <div>
      {user}: {score} points
    </div>
  );
};

Profile.propTypes = {
  user: string,
};

export default Profile;
