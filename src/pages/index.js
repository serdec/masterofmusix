import React from 'react';
import { string, func, array } from 'prop-types';
import App from '../components/App/app';
import page from '../components/HOCs/page';
import { populateTracksDB } from '../libs/fetch-apis';

const noop = () => { };

const Home = ({ user = '', login = noop, tracks = [] } = {}) => (
  <App user={user} login={login} tracks={tracks} />
);

Home.propTypes = {
  user: string,
  login: func,
  tracks: array,
};
export const getStaticProps = async () => {
  const tracks = await populateTracksDB({ genre: 'music' });
  console.log('tracks length', tracks.length);
  return {
    props: { tracks },
    revalidate: 864000, //revalidate every 10 days,
  };
};

export default page(Home);
