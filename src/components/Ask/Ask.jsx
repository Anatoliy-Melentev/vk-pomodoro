import React from 'react';
import { Alert } from '@vkontakte/vkui';
import { Icon24Error } from '@vkontakte/icons';
import { emptyFn } from '../../utils/baseFn';

export function Ask({
  okFn = emptyFn,
  okText = 'Ок',
  closeFn = emptyFn,
  closeText = 'Отмена',
  header = 'Вопрос',
  text = 'Выполнить?',
  icon = Icon24Error,
}) {
  return (
    <Alert
      actions={[{
        title: closeText,
        autoclose: true,
        mode: "cancel",
      }, {
        title: okText,
        autoclose: true,
        mode: "destructive",
        action: () => okFn(),
      }]}
      actionsLayout="horizontal"
      onClose={() => closeFn()}
      header={header}
      text={text}
    />
  );
}
