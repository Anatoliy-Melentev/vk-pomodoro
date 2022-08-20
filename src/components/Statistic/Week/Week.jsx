import React, { useContext } from 'react';
import classNames from 'classnames';
import { generateRandomNumber, between } from '../../../utils/baseFn';
import { LevelLine } from './LevelLine';
import { Column } from './Column';
import styles from './week.sass';
import { Rubber } from '../../Rubber';
import { settingsContext } from '../../../context/settingsContext';

const baseTime = [1, 2, 5, 25, 50, 75, 100, 125, 150, 175, 200];

export function Week({ total, active, setActive }) {
  const { textColor, activeCol } = useContext(settingsContext);
  const getClass = i => classNames("textDay", { ["active"]: active === i });
  const getMax = () => Math.max(...total);
  const getCounts = () => baseTime.find((v) => between(3, Math.ceil(getMax() / v), 10)) || 25;
  const getCountLines = () => Math.ceil(getMax() / getCounts());

  return (
    <Rubber size={50}>
      <div className="lines">
        {Array(getCountLines()).fill(null).map((_, i) => (
          <LevelLine key={generateRandomNumber(i)} time={(i + 1) * getCounts()} />
        ))}
      </div>
      <div className="footer">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((name, i) => (
          <button
            type="button"
            key={generateRandomNumber(i)}
            onClick={() => setActive(i)}
            className={getClass(i)}
            style={{ color: active === i ? activeCol : textColor }}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="columns">
        {total.map((size, i) => (
          <Column
            onClick={() => setActive(i)}
            key={generateRandomNumber(i)}
            size={(size * (100 / (getCountLines() || 1))) / getCounts()}
            active={active === i}
          />
        ))}
      </div>
    </Rubber>
  );
}
