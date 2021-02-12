import React from 'react';
import dingSfx from '../../assets/ding.wav';

const Sound: React.FC = () => {
  return (
    <audio src={dingSfx} autoPlay>
      <track kind="captions" />
    </audio>
  );
};

export default Sound;
