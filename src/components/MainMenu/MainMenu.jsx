import React, { useContext } from 'react';
import { Tabbar, TabbarItem, useAdaptivity, ViewWidth } from '@vkontakte/vkui';
import { Icon28StopwatchOutline, Icon28StatisticsOutline, Icon28SettingsOutline, Icon28InfoOutline } from '@vkontakte/icons';
import { ROUTES, settingsContext } from '../../context/settingsContext';


export function MainMenu() {
  const { viewWidth } = useAdaptivity();
  const { activePanel, setActivePanel, activeModal, setActiveModal } = useContext(settingsContext);
  const buttons = [{
    path: ROUTES.TIMER,
    text: 'Таймер',
    icon: <Icon28StopwatchOutline />,
    activateFn: setActivePanel,
  }, {
    path: ROUTES.STATISTICS,
    text: 'Статистика',
    icon: <Icon28StatisticsOutline />,
    activateFn: setActivePanel,
  }, {
    path: ROUTES.SETTINGS,
    text: 'Настройки',
    icon: <Icon28SettingsOutline />,
    activateFn: setActiveModal,
  }, {
    path: ROUTES.INFO,
    text: 'Информация',
    icon: <Icon28InfoOutline />,
    activateFn: setActiveModal,
  }]

  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  return (
    <Tabbar itemsLayout={isDesktop ? 'horizontal' : 'vertical'} style={{ position: 'fixed', bottom: 0, zIndex: 10, }} >
      {buttons.map(({ path, text, icon, activateFn }) => (
        <TabbarItem key={path} text={text} selected={activePanel === path} onClick={() => activateFn(path)}>
          {icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
}
