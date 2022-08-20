import { hot } from 'react-hot-loader/root';
import React, { useEffect, useState } from 'react';
import { useMountEffect } from './hooks/useMountEffect';
import { Provider } from 'react-redux';
import { store } from './store';
import { AdaptivityProvider, AppRoot, ConfigProvider, useAdaptivity, WebviewType } from '@vkontakte/vkui';
import { BaseView } from './components/BaseView';
import bridge from '@vkontakte/vk-bridge';
import { SettingsContextProvider } from './context/settingsContext';
import { PopoutContextProvider } from './context/popoutContext';

import './variables.global.sass';
import './main.global.sass';

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  const [scheme, setScheme] = useState('bright_light');

  useMountEffect(() => {
    bridge.subscribe(({ detail: { type, data }}) => {
      if (type === 'VKWebAppUpdateConfig') {
        setScheme(data.scheme);
      }
    });
    setMounted(true);
  });

  return (
    <Provider store={store}>
      <ConfigProvider scheme={scheme} webviewType={WebviewType.INTERNAL}>
        <AdaptivityProvider>
          <SettingsContextProvider scheme={scheme}>
            <PopoutContextProvider>
              <AppRoot>
                <BaseView />
              </AppRoot>
            </PopoutContextProvider>
          </SettingsContextProvider>
        </AdaptivityProvider>
      </ConfigProvider>
    </Provider>
  );
}

export const App = hot(AppComponent);
