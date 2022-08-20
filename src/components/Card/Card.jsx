import React, { useContext } from 'react';
import styles from './card.sass';
import { Group, Header } from "@vkontakte/vkui";
import { Icon56BlockOutline, Icon56LiveOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { settingsContext } from '../../context/settingsContext';


export function Card({ type, value = 0 }) {
  const hours = time => Math.trunc(time / 60);
  const minutes = time => time % 60;
  const { theme } = useContext(settingsContext);

  const config = {
    focus: {
      title: 'Фокус',
      colors: {
        dark: { back: '#002256', icon: '#0051ca' },
        light: { back: '#FFDDA9', icon: '#FFAE35' },
      },
      tooltip: 'Отношение времени работы с таймером ко врмени, потраченному на законченные помидорки',
      icon: Icon56LiveOutline,
      getUnit: value => `${value}%`,
    },
    pause: {
      title: 'Время на паузе',
      colors: {
        dark: { back: '#202301', icon: '#636828' },
        light: { back: '#DFDCFE', icon: '#9C97D7' },
      },
      tooltip: 'Время затраченное на паузы',
      icon: Icon56RecentOutline,
      getUnit: value => `${hours(value) ? `${hours(value)}ч ` : ''}${minutes(value) ? `${minutes(value)}м` : ''}` || '0',
    },
    stop: {
      title: 'Остановки',
      colors: {
        dark: { back: '#3a0e00', icon: '#803d28' },
        light: { back: '#C5F1FF', icon: '#7FC2D7' },
      },
      tooltip: 'Количество остановок',
      icon: Icon56BlockOutline,
      getUnit: value => `${value}`,
    },
    inactive: {
      title: '',
      colors: {
        dark: { back: '#222222', icon: '#818c99' },
        light: { back: 'white', icon: '#edeef0' },
      },
      tooltip: '',
      getUnit: () => '&nbsp;',
    },
  };

  const { title, colors, icon, getUnit } = config[type];
  const { dark, light } = value ? colors : config.inactive.colors;
  const { back, icon: iconColor } =  theme === 'vkcom_dark' ? dark : light;

  return (
    <Group
      className="card"
      style={{ backgroundColor: back, borderColor: iconColor, overflow: 'hidden' }}
      header={<Header mode="secondary">{title}</Header>}
    >
      <span className="text">{getUnit(value)}</span>
      {icon({ className: 'cardIcon', fill: iconColor })}
    </Group>
  );
}
