import React, { useEffect, useState, createContext } from 'react';
import { EICON } from '../components/Icon';
import { useSelector } from 'react-redux';
import { getPreferences, toSecFn } from '../store/preferences/selectors';

export const ROUTES = {
  TIMER: 'timer',
  SETTINGS: 'settings',
  STATISTICS: 'statistics',
  INFO: 'information',
};



export const settingsContext = createContext({
  iconView: [EICON.TOMATO, 40],
  theme: 'vkcom_dark',
  activePanel: ROUTES.TIMER,
  activeModal: null,
});

export function SettingsContextProvider({ scheme, children }) {
  const { Provider } = settingsContext;
  const toSec = useSelector(toSecFn);
  const { workTimeOut } = useSelector(getPreferences);
  const [theme, setTheme] = useState(ROUTES.TIMER);
  const [activePanel, setActivePanel] = useState(ROUTES.TIMER);
  const [activeModal, setActiveModal] = useState(null);
  const [iconView, setIconView] = useState([EICON.TOMATO, 40]);
  const baseCol = scheme !== 'vkcom_dark' ? '#EA8979' : '#85afd0';
  const activeCol = scheme !== 'vkcom_dark' ? '#dc3e22' : '#2a5885';
  const textColor = scheme !== 'vkcom_dark' ? '#5181b8' : '#ffffff';
  const selectText = scheme !== 'vkcom_dark' ? '#dc3e22' : '#2a5885';

  const [countTime, setCountTime] = useState(toSec(workTimeOut));

  useEffect(() => {
    setTheme(scheme);
    setIconView(scheme !== 'vkcom_dark' ? [EICON.TOMATO, 40] : [EICON.PUMPKIN, 60]);
  }, [scheme])

  return (
    <Provider value={{
      theme,
      iconView,
      activePanel,
      setActivePanel,
      activeModal,
      setActiveModal,
      textColor,
      selectText,
      baseCol,
      activeCol,
      countTime,
      setCountTime,
    }} >
      {children}
    </Provider>
  );
}
