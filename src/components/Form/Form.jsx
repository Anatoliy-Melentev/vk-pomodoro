import React, { useEffect, useState } from 'react';
import { FormItem, FormLayout, FormLayoutGroup, Input, Button, Group } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditingId } from '../../store/editMode/selectors';
import { selectTasks } from '../../store/task/selectors';
import { setEditMode, setSort } from '../../store/editMode/actions';
import { between, preventDefault } from '../../utils/baseFn';
import { addTask, editTask } from '../../store/task/actions';
import { Icon24Add, Icon24Cancel } from '@vkontakte/icons';

export function Form() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('Ошибка');
  const [touch, setTouch] = useState(false);

  const editId = useSelector(selectEditingId);
  const tasks = useSelector(selectTasks);

  const dispatch = useDispatch();

  const cancelEdit = () => {
    dispatch(setEditMode(0));
    setValue('');
  };

  const checkError = () => {
    if (touch && value.length > 50) {
      setError('Максимально допустимое значение 50 символов');
    } else if (touch && value.length < 3) {
      setError('Минимально допустимое значение 3 символа');
    } else if (touch && !/^[А-Яа-яA-Za-z0-9\-\_\ \.\,\:\;\?\!]+$/g.test(value)) {
      setError('Использованы не допустимые символы');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!between(2, value.length, 51)) {
      setTouch(true);
      checkError();

      return;
    }

    const id = new Date().getTime();
    dispatch(editId ? editTask(editId, value) : addTask(id, value));
    dispatch(editId ? setEditMode(0) : setSort(id));

    setValue('');
    setTouch(false);
  };

  useEffect(() => {
    if (editId && tasks[editId] && tasks[editId].name) {
      setValue(tasks[editId].name);
    } else {
      cancelEdit();
    }
  }, [editId]);
  useEffect(() => checkError(), [value, error, touch]);

  return (
    <Group width={'100%'}>
      <FormLayout onSubmit={preventDefault(handleSubmit)}>
        <FormLayoutGroup mode="horizontal">
        <FormItem status={!error ? "" : "error"} bottom={error}>
          <Input placeholder="Название задачи" value={value} onChange={({ target: { value: v }}) => setValue(v)} />
        </FormItem>
        <Button
          style={{ borderRadius: "50%", marginLeft: '10px', height: '36px' }}
          before={<Icon24Add />}
          onClick={handleSubmit}
          appearance="accent"
          disabled={touch && !!error}
          size="l"
        />
        {!!editId &&
          <Button
            style={{ borderRadius: "50%", marginLeft: '10px', height: '36px' }}
            before={<Icon24Cancel />}
            onClick={cancelEdit}
            appearance="accent"
            mode="secondary"
            size="l"
          />
        }
        </FormLayoutGroup>
      </FormLayout>
    </Group>
  );
}
