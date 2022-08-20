import React, { useContext, useEffect, useState } from 'react';
import styles from './statistic.sass';
import {
  CustomSelect,
  CustomSelectOption,
  FormItem,
  Group,
  Header,
  Panel,
  useAdaptivity,
  View,
  ViewWidth,
} from '@vkontakte/vkui';
import { declinationOfNumber } from '../../utils/baseFn';
import { getDay, getCurSeconds } from '../../utils/appFn';
import { useSelector } from 'react-redux';
import { selectStatistics } from '../../store/statistics/selectors';
import { Icon } from '../../components/Icon';
import { settingsContext } from '../../context/settingsContext';
import { Week } from './Week';
import { Rubber } from '../Rubber';
import { Card } from '../Card';

export function Statistic() {
  const { viewWidth } = useAdaptivity();
  const curDayId = getDay(getCurSeconds());
  const weekDay = new Date().getDay();
  const rusWeek = weekDay ? weekDay - 1 : 6;
  const [active, setActive] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const startWeekId = curDayId + 1 - (weekDay || 7) - (weekCount * 7);
  const weekStat = [...Array(7).keys()].map(i => useSelector(selectStatistics(startWeekId + i)));
  const { tomato, tomatoDT, totalDT, pauseDT, stopTimes } = weekStat[active];
  const addNull = n => n.toString().length === 1 ? `0${n}` : n.toString();
  const { selectText, iconView: [logoIcon, logoSize] } = useContext(settingsContext);

  const calculatePeriod = week => {
    const startWeek = curDayId + 1 - (weekDay || 7) - (week * 7);
    const getDT = day => new Date(day * 24 * 60 * 60 * 1000);
    const createDate = date => `${addNull(date.getDate())}.${addNull(date.getMonth() + 1)}.${date.getFullYear()}`;

    return `${createDate(getDT(startWeek))} - ${createDate(getDT(startWeek + 6))}`;
  };

  const period = [{
    label: 'Эта неделя',
    value: 0,
  }, {
    label: 'Прошедшая неделя',
    value: 1,
  }, {
    label: '2 недели назад',
    value: 2,
  }];

  const hours = () => Math.trunc(tomatoDT / 60) && Math.trunc(tomatoDT / 60);
  const tomatoDTName = `${hours() ? declinationOfNumber(hours(), [' часа', '-х часов', ' часов']) : ''} `
    + `${declinationOfNumber(tomatoDT % 60, [' минуты', '-х минут', ' минут'])}`;

  useEffect(() => setActive(!weekCount ? rusWeek : 0), [weekCount]);

  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  return (
    <>
      <Group>
        <FormItem top={"Ваша активность"}>
          <CustomSelect
            placeholder="Выберите неделю"
            renderOption={({ option, ...restProps }) => (
              <CustomSelectOption {...restProps} description={calculatePeriod(option.value)} />
            )}
            value={weekCount}
            onChange={({ target }) => setWeekCount(target.value)}
            options={period}
          />
        </FormItem>
      </Group>
      <Rubber size={37} style={{ height: '100%' }} isRubber={isDesktop}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          flexDirection: isDesktop ? 'row' : 'column-reverse',
        }}>
          <div style={{
            width: isDesktop ? '26.5%' : '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: "3fr 4fr",
            gridRowGap: '16px'
          }}>
              <Group
                style={{ display: 'grid', gridTemplateRows: "100%" }}
                header={
                  <Header mode="secondary" >
                    {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][active]}
                  </Header>
                }>

                <div style={{ padding: ' 10px 20px 20px', }}>
                  {tomatoDT
                    ? <span>
                      Вы работали над задачами в течение <span style={{ color: selectText }}>{tomatoDTName}</span>
                    </span>
                    : <span>Нет данных</span>
                  }
                </div>
              </Group>
              <Group style={{ display: 'grid', gridTemplateRows: "100%" }}>
                {tomato ? (
                  <div style={{ display: 'grid', gridTemplateRows: "3fr 1fr", height: '100%' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      paddingRight: '20px',
                    }}>
                      <Icon name={logoIcon} size={logoSize * 1.5} />&nbsp;{`x ${tomato}`}
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: selectText,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                      {declinationOfNumber(tomato, [' помидор', ' помидора', ' помидоров'])}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Icon name={logoIcon} size={logoSize * 3} />
                  </div>
                )}
              </Group>
          </div>
          <div style={{ width: isDesktop ? '72%' : '100%' }}>
            <View activePanel="timer" width="100%">
              <Panel style={{ justifyContent: 'center', width: '100%', textAlign: 'center' }} id="timer">
                <Group>
                  <Week total={weekStat.map((day) => Math.trunc(day.totalDT))} active={active} setActive={setActive} />
                </Group>
              </Panel>
            </View>
          </div>
        </div>
      </Rubber>
      <Rubber size={17} style={{ paddingBottom: '10px' }}>
        <div style={{
          display: isDesktop ? 'grid' : 'flex',
          gridTemplateColumns: isDesktop && '1fr 1fr 1fr',
          flexDirection: !isDesktop && 'column',
          gridColumnGap: '16px',
          marginTop: '16px',
          minHeight: '500px',
          paddingBottom: '100px',
          height: '100%',
        }}>
          <Card style={{ marginTop: '16px' }} type='focus' key='focus' value={Math.round((tomatoDT / (totalDT || 1)) * 100) } />
          <Card style={{ marginTop: '16px' }} type='pause' key='pause' value={Math.round(pauseDT / 60)} />
          <Card style={{ marginTop: '16px' }} type='stop' key='stop' value={stopTimes} />
        </div>
      </Rubber>
    </>
  );
}
