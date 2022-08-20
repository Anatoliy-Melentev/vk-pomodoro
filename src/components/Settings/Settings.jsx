import React from 'react';
import { Input, FormItem, Group, Slider, Checkbox, RadioGroup, Radio } from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import { getPreferences } from "../../store/preferences/selectors";
import { setCurCountBreaks } from "../../store/timer/actions";
import {
  setAddTime, setBreakTime, setCountBreaks, setLongTime, setNotify, setSeconds, setWorkTime,
} from '../../store/preferences/actions';
import { sounds, sendNotify } from "../../utils/appFn";
import no from "../../no.png";
import ok from "../../ok.png";

export function Settings() {
  const {
    workTimeOut, breakTimeOut, longTimeOut, additingTime, countBreaks, sound, notify, seconds
  } = useSelector(getPreferences);

  const dispatch = useDispatch();

  const handlerChange = () => {
    if (notify) {
      sendNotify('Всплывающие уведомления отключены!', no);
      dispatch(setNotify(false));

      return;
    }

    if (!('Notification' in window)) {
      alert('Этот браузер не поддерживает всплывающие уведомления!');
      dispatch(setNotify(false));
    }

    if (Notification.permission === 'granted') {
      sendNotify('Всплывающие уведомления включены!', ok);
      dispatch(setNotify(true));
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          sendNotify('Всплывающие уведомления включены!', ok);
        } else {
          alert('Не получено разрешение на всплывающие уведомления!');
        }
        dispatch(setNotify(permission === 'granted'));
      });
    } else {
      alert('Отправка уведомлений запрещена для данного сайта!');
    }
  };

  const handleCountBreaks = time => {
    dispatch(setCurCountBreaks(time));
    dispatch(setCountBreaks(time));
  };

  const preferences = [{
    id: 'workTimeOut',
    name: 'Рабочий интервал',
    unit: 'мин',
    interval: [15, 60],
    value: workTimeOut,
    changeFn: setWorkTime,
  }, {
    id: 'additingTime',
    name: 'Добавочное время',
    unit: 'мин',
    interval: [1, 15],
    value: additingTime,
    changeFn: setAddTime,
  }, {
    id: 'breakTimeOut',
    name: 'Короткий перерыв',
    unit: 'мин',
    interval: [1, 15],
    value: breakTimeOut,
    changeFn: setBreakTime,
  }, {
    id: 'longTimeOut',
    name: 'Длинный перерыв',
    unit: 'мин',
    interval: [15, 60],
    value: longTimeOut,
    changeFn: setLongTime,
  }, {
    id: 'countBreaks',
    name: 'Длинный перерыв',
    unit: 'раз',
    interval: [3, 6],
    value: countBreaks,
    changeFn: handleCountBreaks,
  }]

  return (
    <Group>
      {preferences.map(({ id, name, unit, interval: [min, max], value, changeFn }) => (
        <div key={id}>
          <FormItem top={`${name} (от ${min} до ${max} ${unit})`} id={id}>
            <Slider
              step={1} min={min} max={max} value={value} onChange={time => dispatch(changeFn(time))}
            />
          </FormItem>
          <FormItem>
            <Input value={value} onChange={time => dispatch(changeFn(Number(time)))} type="number" />
          </FormItem>
        </div>
      ))}
      <FormItem>
        <Checkbox
          onChange={() => dispatch(setSeconds(!seconds))}
          checked={seconds}
          description="Использовать секунды вместо минут"
        >
          Тестовый режим
        </Checkbox>
      </FormItem>
      <FormItem>
        <Checkbox
          onChange={handlerChange}
          checked={notify}
          description="Показывать уведомление при окончании работы таймера"
        >
          Включить уведомления
        </Checkbox>
      </FormItem>
      <FormItem top="Выберите звук уведомления">
        <RadioGroup>
          {Object.values(sounds).map(([id, name]) => (
            <Radio name="fit" value="classic" defaultChecked={sound === id} key={id} disabled={!notify}>
              {name}
            </Radio>
          ))}
        </RadioGroup>
      </FormItem>
    </Group>
  );
}
