import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreferences, selectTimeOutLength, toSecFn } from '../../store/preferences/selectors';
import { selectSort } from '../../store/editMode/selectors';
import { selectTasks } from '../../store/task/selectors';
import { selectTimer } from '../../store/timer/selectors';
import { checkStatistics } from '../../store/statistics/selectors';
import {
  addMoreTime, addStartTime, changeStage, clearAllTime, setAddedTime, setPauseTime, setStartPreferences, setStartTime,
} from '../../store/timer/actions';
import { addPauseTime, addStop, addTomatoTime, addTotalTime, createRecordStat } from '../../store/statistics/actions';
import { setSort } from '../../store/editMode/actions';
import { addCompletedCount, setCompleted } from '../../store/task/actions';
import { getCurSeconds, sendNotify, playSound } from '../../utils/appFn';
import { useMountEffect } from '../../hooks/useMountEffect';
import { Button, ButtonGroup } from '@vkontakte/vkui';
import { Icon24Add } from '@vkontakte/icons';
import { Text } from '@vkontakte/vkui';
import tomato from '../../tomato.png';
import { settingsContext } from '../../context/settingsContext';

export function Timer() {
  const dispatch = useDispatch();

  const { countTime, setCountTime } = useContext(settingsContext);
  const toSec = useSelector(toSecFn);

  const sort = useSelector(selectSort);
  const tasks = useSelector(selectTasks);
  const activeTask = sort.find((id) => !tasks[id].isCompleted);

  const { additingTime, countBreaks, notify, sound } = useSelector(getPreferences);
  const { startDT, pauseDT, workStage, addedTime, curCountBreaks } = useSelector(selectTimer);

  const timeOutLength = useSelector(selectTimeOutLength(curCountBreaks));

  const isCurState = useSelector(checkStatistics);
  const [seconds, setSeconds] = useState(getCurSeconds());
  setInterval(() => setSeconds(getCurSeconds()), 1000);

  const handleStart = () => {

    console.log('startDT: ', startDT, 'cursec: ', getCurSeconds());
    if (!startDT) {
      dispatch(setStartTime());

      console.log('startDT: ', startDT, 'cursec: ', getCurSeconds());
    } else if (!pauseDT) {
      dispatch(addTotalTime(getCurSeconds() - startDT - addedTime));
      dispatch(setPauseTime());
    } else {
      dispatch(addPauseTime(getCurSeconds() - pauseDT));
      dispatch(addStartTime());
    }
  };

  const handleStop = () => {
    dispatch(clearAllTime());
    setCountTime(toSec(timeOutLength));
    if (pauseDT) {
      dispatch(addTomatoTime(getCurSeconds() - startDT - addedTime));
      dispatch(setSort(activeTask));
      dispatch(setCompleted(activeTask));
    } else if (workStage) {
      dispatch(addStop());
      dispatch(addTotalTime(getCurSeconds() - startDT - addedTime));
    } else {
      dispatch(changeStage(countBreaks));
      dispatch(addCompletedCount(activeTask));
      dispatch(addTotalTime(getCurSeconds() - startDT - addedTime));
    }

    dispatch(setAddedTime(0));
  };

  const addTime = () => {
    if (startDT) {
      dispatch(addMoreTime(toSec(additingTime)));
    } else {
      dispatch(setAddedTime(prev => prev + toSec(additingTime)));
      setCountTime(prev => prev + toSec(additingTime));
    }
  };

  const changeTimer = () => {
    if (!startDT) {
      return;
    }
    if (!pauseDT) {
      const totalTime = startDT + addedTime + toSec(timeOutLength) - getCurSeconds();
      if (totalTime < 0) {
        if (workStage) {
          dispatch(addTomatoTime(getCurSeconds() - startDT + toSec(additingTime)));
          if (notify) {
            sendNotify('Время работы над задачей закончилось, пора отдохнуть!', tomato);
            playSound(sound);
          }
        }

        dispatch(changeStage(countBreaks));
        dispatch(clearAllTime());
        dispatch(setAddedTime(0));

        if (!workStage) {
          dispatch(addTotalTime(getCurSeconds() - startDT + toSec(additingTime)));
          dispatch(addCompletedCount(activeTask));
          if (notify) {
            sendNotify('Перерыв закончился, пора продолжить работу!', tomato);
            playSound(sound);
          }
        }
      } else {
        setCountTime(totalTime);
      }
    } else {
      setCountTime(startDT + toSec(timeOutLength) - pauseDT);
    }
  };

  useEffect(() => changeTimer(), [seconds]);

  useEffect(() => {
    if (!activeTask || !tasks[activeTask]) {
      dispatch(setStartPreferences());
    }
  }, [activeTask]);

  useEffect(() => setCountTime(toSec(timeOutLength)), [workStage]);
  useEffect(() => {
    if (activeTask && tasks[activeTask].countCompleted >= tasks[activeTask].count) {
      dispatch(setSort(activeTask));
      dispatch(setCompleted(activeTask));
    }
  }, [tasks]);

  useMountEffect(() => {
    if (!isCurState) {
      dispatch(createRecordStat());
      dispatch(setStartPreferences());
      dispatch(setAddedTime(0));
    }

    changeTimer();
  });

  const addNull = num => num.toString().length === 1 ? `0${num.toString()}` : num.toString()

  return (
    <div>
      <div
        style={{
          fontSize: 100,
          padding: '80px 0 50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 100, fontWeight: 100 }}>
          {addNull(Math.trunc((countTime / 60) % 60))}:{addNull(countTime % 60)}
        </Text>
        <Button
          before={<Icon24Add />}
          onClick={addTime}
          appearance="accent"
          size="l"
          style={{ borderRadius: "50%", margin: '15px -45px 0 10px' }}
        />
      </div>
      <div>
        {workStage &&
          <span>
            Задача&nbsp; {sort.indexOf(activeTask) + 1} &nbsp;-&nbsp; {tasks[activeTask].name}
          </span>
        }
        {!workStage &&
          <span>
            {curCountBreaks === countBreaks ? 'Длинный' : 'Короткий'} &nbsp;перерыв
          </span>
        }
        {!!pauseDT && <span>&nbsp;-&nbsp;пауза</span>}
      </div>
      <ButtonGroup style={{ margin: '30px 0 50px' }}>
        <Button onClick={handleStart} appearance="positive" size="l" stretched style={{ width: 140 }}>
          {!startDT ? 'Старт' : (!pauseDT ? 'Пауза' : 'Продожить')}
        </Button>
        <Button disabled={!startDT} onClick={handleStop} appearance="negative" size="l" stretched style={{ width: 140 }}>
          {workStage ? (!pauseDT ? 'Стоп' : 'Сделано') : 'Пропустить'}
        </Button>
      </ButtonGroup>
    </div>
  );
}
