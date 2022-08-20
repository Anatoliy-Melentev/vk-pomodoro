import React, { useContext, useEffect, useState } from 'react';
import styles from './baseview.sass';
import {
  Avatar, Div, Panel, Snackbar, SplitCol, SplitLayout, useAdaptivity, View, ViewWidth,
} from '@vkontakte/vkui';
import { TopPanel } from '../TopPanel';
import { MainMenu } from '../MainMenu';
import { ROUTES } from '../../context/settingsContext';
import { settingsContext } from '../../context/settingsContext';
import { popoutContext } from '../../context/popoutContext';
import { TimerPage } from '../TimerPage';
import bridge from '@vkontakte/vk-bridge';
import { Icon24Error } from '@vkontakte/icons';
import { Modal } from '../Modal';
import { Statistic } from '../Statistic';

const panels = [{
  id: ROUTES.TIMER,
  text: 'Таймер',
  view: <TimerPage />,
}, {
  id: ROUTES.STATISTICS,
  text: 'Статистика',
  view: <Statistic />,
}];

const STORAGE_KEYS = {
  RULSSTATE: 'rulsstate',
}

export function BaseView() {
  const { viewWidth } = useAdaptivity();
  const { popout, setPopout, snackbar, setSnackbar } = useContext(popoutContext);
  const { activePanel } = useContext(settingsContext);
  const [fetchedUser, setUser] = useState(null);
  const [rulsHide, setRulsHide] = useState(false);

  const modal = (<Modal />);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      const storageData = await bridge.send('VKWebAppStorageGet', {
        keys: Object.values(STORAGE_KEYS)
      });
      const data = {};
      storageData.keys.forEach(({ key, value}) => {
        try {
          data[key] = value ? JSON.parse(value) : {};
          switch (key) {
            case STORAGE_KEYS.RULSSTATE:
              setRulsHide(data[key]);
            default:
              break;
          }
        } catch (error) {
          setSnackbar(
            <Snackbar
              duration={900}
              layout="vertical"
              onClose={() => setSnackbar(null)}
              before={
                <Avatar size={24} >
                  <Icon24Error fill="#fff" width="14" height="14" />
                </Avatar>
              }
            >
              Проблема получения данных из Storage
            </Snackbar>
          );
        }
      });

      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <SplitLayout popout={popout} modal={modal}>
      <SplitCol animate={viewWidth <= ViewWidth.MOBILE}>
        <View activePanel={activePanel}>
          {panels.map(({ id, text, view }) => (
            <Panel key={id} id={id} style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
              <TopPanel isClose={id === ROUTES.TIMER} text={text} />
              <div style={{ flex: "1 0 auto" }}>
                {view}
              </div>
              {snackbar}
              <MainMenu style={{ flex: "0 0 auto", marginTop: 30 }} />
            </Panel>
          ))}
        </View>
      </SplitCol>
    </SplitLayout>
  );
}
