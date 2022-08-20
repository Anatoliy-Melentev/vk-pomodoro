import React from 'react';
import styles from './info.sass';
import { Icon12Verified, Icon16Verified, Icon24Done, Icon28DoneOutline } from '@vkontakte/icons';
import { MiniInfoCell, Separator } from '@vkontakte/vkui';

const rules = [
  [0, 'Выберите категорию и напишите название текущей задачи'],
  [1, 'Запустите таймер («помидор»)'],
  [2, 'Работайте пока «помидор» не прозвонит'],
  [3, 'Сделайте короткий перерыв (3-5 минут)'],
  [4, 'Продолжайте работать «помидор» за «помидором», пока задача не будет выполнена. '
  + 'Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).'],
];

export function Info() {
  return (
    <div className="info">
      {rules.map(([i, rule]) => (
          <MiniInfoCell
            key={i}
            before={<Icon24Done />}
            textWrap="full"
            textLevel="primary"
            style={{ margin: '40px 20px !important' }}
          >
            {rule}
          </MiniInfoCell>
      ))}
    </div>
  );
}
