import React, { useContext } from 'react';
import styles from './levelline.sass';
import { settingsContext } from '../../../../context/settingsContext';

export function LevelLine({ time }) {
  const { theme } = useContext(settingsContext);
  const hours = () => Math.trunc(time / 60);
  const minuts = () => time % 60;

  return (
    <div className="level">
      <div className="line" style={{ backgroundColor: theme === 'vkcom_dark' ? 'white' : '#222222' }} />
      <div className="value">
        {!!hours() && `${hours()} час`}
        {!!minuts() && ` ${minuts()} мин`}
      </div>
    </div>
  );
}
