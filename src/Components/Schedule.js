import React, { useState } from 'react';
import { Timeline, Input, Form, Button } from 'antd';
import { TimePicker } from 'antd';
import moment from 'moment';
import { Exercise } from './Exercise';

const NewExerciseForm = ({ onAddExercise, date }) => {
  const format = 'HH:mm';

  const handleAddExercise = onAddExercise;

  return (
    <Form onFinish={values => handleAddExercise(values.name, values.at)} layout="horizontal">
      <Form.Item label="Name" name="name">
        <Input size="small" />
      </Form.Item>
      <Form.Item label="At" name="at">
        <TimePicker
          size="small"
          defaultValue={moment(undefined, format)
            .date(date.date())
            .year(date.year())
            .month(date.month())}
          format={format}
        />
      </Form.Item>
      <Button htmlType="submit" size="small">
        Save
      </Button>
    </Form>
  );
};

export const Schedule = ({
  numberOfBreaks,
  date,
  exercises,
  onAddExercise,
}) => {
  const nodes = exercises
    .map(e => <Exercise {...e} />)
    .concat([<NewExerciseForm onAddExercise={onAddExercise} date={date} />]);

  return (
    <Timeline>
      {nodes.map(n => (
        <Timeline.Item>{n}</Timeline.Item>
      ))}
    </Timeline>
  );
};
