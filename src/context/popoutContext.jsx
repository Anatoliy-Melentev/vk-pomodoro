import React, { useState, createContext } from 'react';
import { ScreenSpinner } from '@vkontakte/vkui';

export const popoutContext = createContext({
  popout: <ScreenSpinner size='large' />,
  snackbar: null,
});

export function PopoutContextProvider({ children }) {
  const { Provider } = popoutContext;
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  const [snackbar, setSnackbar] = useState(false);

  return (
    <Provider value={{ popout, setPopout, snackbar, setSnackbar }}>
      {children}
    </Provider>
  );
}
