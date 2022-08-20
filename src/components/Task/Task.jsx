import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompletedCount, changeTimeTask, deleteTask, setCompleted } from '../../store/task/actions';
import { deleteSort, setEditMode } from '../../store/editMode/actions';
import { setSort } from '../../store/editMode/actions';
import { ActionSheet, ActionSheetItem, Avatar, Button, Cell } from '@vkontakte/vkui';
import {
  Icon16AddCircleOutline, Icon16Delete, Icon16Done,
  Icon16MinusCircleOutline, Icon16PenOutline, Icon24Error, Icon24MoreHorizontal,
} from '@vkontakte/icons';
import { useMountEffect } from '../../hooks/useMountEffect';
import { popoutContext } from '../../context/popoutContext';
import { settingsContext } from '../../context/settingsContext';
import { selectTimer } from '../../store/timer/selectors';
import { Ask } from '../Ask';
import { Msg } from '../Msg';
import { changeStage, clearAllTime } from '../../store/timer/actions';
import { selectTimeOutLength, toSecFn } from '../../store/preferences/selectors';
import { addStop, addTotalTime } from '../../store/statistics/actions';
import { getCurSeconds } from '../../utils/appFn';
import { selectSort } from '../../store/editMode/selectors';
import { selectTasks } from '../../store/task/selectors';

export function Task({ id, params: { count, name, isCompleted } }) {
  const { setPopout, setSnackbar } = useContext(popoutContext);
  const { textColor, setCountTime } = useContext(settingsContext);
  const { curCountBreaks, startDT, workStage, countBreaks, addedTime } = useSelector(selectTimer);
  const sort = useSelector(selectSort);
  const tasks = useSelector(selectTasks);
  const activeTask = sort.find((id) => !tasks[id].isCompleted);
  const timeOutLength = useSelector(selectTimeOutLength(curCountBreaks));
  const toSec = useSelector(toSecFn);
  const refMenu = useRef(null);
  const onClose = () => setPopout(null);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(id));
    dispatch(deleteSort(id));
  };

  const menu = [{
    idx: 'increase',
    icon: <Icon16AddCircleOutline fill={textColor} />,
    color: textColor,
    text: 'Увеличить',
    onClick: () => dispatch(changeTimeTask(id, count + 1)),
  }, {
    idx: 'decrease',
    icon: <Icon16MinusCircleOutline fill={textColor} />,
    color: textColor,
    text: 'Уменьшить',
    onClick: () => dispatch(count - 1 ? changeTimeTask(id, count - 1) : openDeletion()),
  }, {
    idx: 'edit',
    icon: <Icon16PenOutline fill={textColor} />,
    color: textColor,
    text: 'Редактировать',
    onClick: () => dispatch(setEditMode(id)),
  }, {
    idx: 'delete',
    icon: <Icon16Delete fill="#ff5c5c" />,
    color: '#ff5c5c',
    text: 'Удалить',
    onClick: () => openDeletion(),
  }];

  const openDeletion = () => {
    setPopout(
      <Ask
        header="Удаление задачи"
        text="Вы уверены, что хотите удалить эту задачу?"
        okText="Удалить"
        closeFn={() => setPopout(null)}
        okFn={() => {
          handleDelete();
          setSnackbar(<Msg closeFn={() => setSnackbar(null)} text="Задача удалена!" icon={Icon24Error} />);
        }}
      />
    );
  }

  const openIcons = (isCompleted) => {
    dispatch(setEditMode(0));
    setPopout(
      <ActionSheet
        onClose={onClose}
        iosCloseItem={
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        toggleRef={refMenu}
      >
        {menu.map(({ idx, icon, text, color, onClick }) =>
          (!isCompleted || isCompleted && idx === 'delete') && (
          <ActionSheetItem style={{ color: color }} autoclose key={idx} id={idx} onClick={onClick} before={icon}>
            {text}
          </ActionSheetItem>
        ))}
      </ActionSheet>
    );
  }

  const openStopTask = (callback) => {
    setPopout(
      <Ask
        header="Перемещение задачи"
        text="При перемещении активной задачи, прогресс по ней будет потерян. Продолжить?"
        okText="Продолжить перемещение"
        closeFn={() => setPopout(null)}
        okFn={() => callback()}
      />
    );
  }

  const moveTask = (from, to) => {
    if ((!from || !to) && startDT) {
      openStopTask(() => {
        dispatch(clearAllTime());
        setCountTime(toSec(timeOutLength));
        if (workStage) {
          dispatch(addStop());
        } else {
          dispatch(changeStage(countBreaks));
        }
        dispatch(addTotalTime(getCurSeconds() - startDT - addedTime));
        dispatch(setSort(Number(id), to));
      });

      return;
    }
    dispatch(setSort(Number(id), to))
  }

  useMountEffect(() => dispatch(setEditMode(0)));

  return (
    <Cell
      style={{ position: 'relative' }}
      key={id}
      id={id}
      draggable={!isCompleted}
      onDragFinish={({ from, to }) => moveTask(from, to)}
      before={
        <Avatar
          style={{
            background: 'transparent',
            color: "var(--white)",
            marginLeft: isCompleted ? 40 : 0
          }}
          size={28}
          mode="tertiary"
          onClick={() => dispatch(setCompleted(id))}
        >
          {isCompleted
            ? <Icon16Done fill={isCompleted ? '#4bb34b' : 'var(--destructive)'} />
            : <div style={{ color: isCompleted ? '#4bb34b' : textColor, lineHeight: "16px" }}>{count}</div>
          }
        </Avatar>
      }
      after={
        <Button getRootRef={refMenu} onClick={() => openIcons(isCompleted)} mode="tertiary">
          <Icon24MoreHorizontal />
        </Button>
      }
    >
      <span>{name.length < 31 ? name : `${name.substring(0, 30)}...`}</span>
    </Cell>
  );
}
