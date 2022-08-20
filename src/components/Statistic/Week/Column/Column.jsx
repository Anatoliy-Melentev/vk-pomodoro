import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { emptyFn } from '../../../../utils/baseFn';
import styles from './column.sass';
import { settingsContext } from '../../../../context/settingsContext';

export function Column({ size = 5, active = false, onClick = emptyFn }) {
  const { baseCol, activeCol } = useContext(settingsContext);
  const classes = classNames("column", { ["full"]: size }, { ["active"]: active });
  const div = useRef(null);

  useEffect(() => {
    if (div.current) {
      div.current.style.height = size < 5 ? '5px' : `${size}%`;
    }
  }, [size, active]);

  return (
    <div ref={div} className="allcolumn">
      <button
        type="button"
        onClick={onClick}
        className={classes}
        style={{ backgroundColor: active ? activeCol : baseCol }}
      >
        &nbsp;
      </button>
    </div>
  );
}
