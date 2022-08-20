import React, { useContext, useState } from 'react';
import styles from './timerpage.sass';
import { Icon } from '../../components/Icon';
import { settingsContext } from '../../context/settingsContext';
import { Header, Group, Panel, ViewWidth, View, Div, useAdaptivity } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/task/selectors';
import { selectSort } from '../../store/editMode/selectors';
import { Timer } from '../Timer';
import { selectTimer } from '../../store/timer/selectors';
import { Form } from '../Form';
import { TaskList } from '../TaskList';

export function TimerPage() {
  const { viewWidth } = useAdaptivity();
  const sort = useSelector(selectSort);
  const tasks = useSelector(selectTasks);
  const { startDT, pauseDT, workStage } = useSelector(selectTimer);
  const activeTask = sort.find((id) => !tasks[id].isCompleted);
  const { iconView: [logoIcon, logoSize] } = useContext(settingsContext);
  const getColor = () => !!startDT && !pauseDT ? (workStage ? 'red' : 'green') : 'grey';

  const isDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  return (
    <div
      style={{
        display: isDesktop ? 'grid' : 'flex',
        gridTemplateColumns: isDesktop && '350px 16px 1fr',
        width: !isDesktop && '100%',
        flexDirection: !isDesktop && 'column-reverse',
      }}
    >
      <div style={{ width: isDesktop ? 'auto' : '100%', height: isDesktop ? '100%' : 'auto' }}>
        <Panel width="100%">
          <Form />
          <TaskList />
        </Panel>
      </div>
      {isDesktop && <div />}
      <div style={{ width: isDesktop ? 'auto' : '100%', height: isDesktop ? '100%' : 'auto' }}>
        <View activePanel="timer" width="100%">
          <Panel style={{ justifyContent: 'center', width: '100%', textAlign: 'center' }} id="timer">
            <Group header={
              <Header
                style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: getColor() }}
                className="timerHeader"
                mode="secondary"
              >
                {activeTask && tasks[activeTask] &&
                <div style={{ justifyContent: 'space-between', display: 'flex', width: '100%', color: getColor() }}>
                  <span style={{ textAlign: 'left'}}>
                    {tasks[activeTask].name} &nbsp;
                  </span>
                  <span style={{ textAlign: 'right'}}>
                    &nbsp; Помидор {tasks[activeTask].countCompleted + 1}
                  </span>
                </div>
                }
              </Header>
            }>
              {activeTask ? <Timer /> : <div style={{ padding: '60px 0' }}><Icon name={logoIcon} size={logoSize * 5} /></div>}
            </Group>
          </Panel>
        </View>
      </div>
    </div>
  );
}
