import React, { useContext } from 'react';
import { PanelHeader, PanelHeaderBack, PanelHeaderClose, PanelHeaderContent } from '@vkontakte/vkui';
import { Icon } from '../Icon';
import { ROUTES, settingsContext } from '../../context/settingsContext';

export function TopPanel({ isClose,  text }) {
  const { iconView: [icon, size], setActivePanel } = useContext(settingsContext);

  return (
    <PanelHeader
      before={isClose
        ? <PanelHeaderClose sizeX={24} sizeY={24} label="Закрыть" />
        : <PanelHeaderBack onClick={() => setActivePanel(ROUTES.TIMER)} label="Назад" />
      }
    >
      <PanelHeaderContent status={text} before={<Icon name={icon} size={size}/>}>
        <div style={{ marginRight: '10px' }}>Pomodoro</div>
      </PanelHeaderContent>
    </PanelHeader>
  );
}
