import React from 'react';
import icons from './icons.svg';

const baseSizes = {
  menu: [26, 6],
};

export const EICON = {
  // ok = 'ok',
  // stat = 'stat',
  // stop = 'stop',
  // menu = 'menu',
  // plus = 'plus',
  EDIT: 'edit',
  // lamp = 'lamp',
  // info = 'info',
  // eyes = 'eyes',
  // focus = 'focus',
  // pause = 'pause',
  // check = 'check',
  // timer = 'timer',
  // close = 'close',
  TOMATO: 'tomato',
  DELETE: 'delete',
  // topmenu = 'topmenu',
  PUMPKIN: 'pumpkin',
  INCREASE: 'increase',
  DECREASE: 'decrease',
  // bigtomato = 'bigtomato',
  // preferences = 'preferences',
  // angrytomato = 'angrytomato',
};

const ESIZES = {
  WIDTH: 0,
  HEIGHT: 1,
}

function countSize(type, name, size) {
  return ((baseSizes[name] ? baseSizes[name][type] : 20) * size) / 20;
}

function getWidth(name, size) {
  return countSize(ESIZES.WIDTH, name, size);
}

function getHeight(name, size) {
  return countSize(ESIZES.HEIGHT, name, size);
}

export function Icon({ name, size = 20, className = '' }) {
  return (
    <svg className={className} width={getWidth(name, size)} height={getHeight(name, size)}>
      <use xlinkHref={`${icons}#${name}`} />
    </svg>
  );
}
