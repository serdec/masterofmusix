import React, { useEffect, useState } from 'react';
import { getBestScores } from '../../libs/user-apis';

const Best = () => {
  const [bestPlayers, setBestPlayers] = useState([]);

  // hydrate with current state
  useEffect(() => {
    setBestPlayers(getBestScores(10));
  }, []);

  return (
    <div>
      {bestPlayers.map(({ name, score }) => (
        <div key={name}>
          {name}:{score}
        </div>
      ))}
    </div>
  );
};
export default Best;
