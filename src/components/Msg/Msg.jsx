import React from 'react';
import { Avatar, Snackbar } from '@vkontakte/vkui';

export function Msg({ text, icon, closeFn }) {
  return (
    <Snackbar
      duration={900}
      layout="vertical"
      onClose={closeFn}
      before={
        <Avatar size={24} >
          {icon({ fill: '#fff', width: 14, height: 14})}
        </Avatar>
      }
    >
      {text}
    </Snackbar>
  );
}
