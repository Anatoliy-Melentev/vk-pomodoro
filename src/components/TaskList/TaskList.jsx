import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreferences } from '../../store/preferences/selectors';
import { selectTasks } from '../../store/task/selectors';
import { selectSort } from '../../store/editMode/selectors';
import { Task } from '../Task';
import { Div, Group, List, Separator } from '@vkontakte/vkui';

export function TaskList() {
  const { workTimeOut } = useSelector(getPreferences);
  const [total, setTotal] = useState(0);
  const tasks = useSelector(selectTasks);
  const sort = useSelector(selectSort);
  const hours = () => Math.trunc(total / 60);
  const minuts = () => total % 60;

  useEffect(() => {
    if (sort && sort[0]) {
      setTotal(sort.reduce((res, i) => !tasks[i].isCompleted ? res + tasks[i].count : res, 0) * workTimeOut);
    }
  }, [tasks, sort]);

  return (
    <>
    {sort && !!sort.length && (
      <Group>
        <div>
          <List>
            {sort && sort.filter((id) => !tasks[id].isCompleted).map((id, i, arr) => (
              <Task key={id} id={id} params={tasks[id]} />
            ))}
          </List>
          {sort && sort.filter((id) => tasks[id].isCompleted).slice(0).reverse()
            .map((id, i, arr) => <Task key={id} id={id} params={tasks[id]} />)
          }
        </div>
        {!!total && (
          <div>
            <Separator style={{ marginTop: 20 }} />
            <Div>
              {!!hours() && `${hours()} час `}
              {!!minuts() && `${minuts()} мин`}
            </Div>
          </div>
        )}
      </Group>
    )}
    </>
  );
}
