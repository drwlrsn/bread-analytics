import React, { useEffect, useContext, useState } from 'react';
import { Centered } from '../Layouts/Centered';
import { AuthContext } from '../AuthContext';
import { db } from '../firebase';
import { Exercise } from '../Components/Exercise';
import { List, Typography, Divider } from 'antd';

const {Title} = Typography;

export const Home = ({ navigate }) => {
  const {
    auth: { name, id },
  } = useContext(AuthContext);

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    // db.ref(`/users/${id}/exercices/oyXsgHpCdsLny8DjkCob`).once('value').then(snapshot => setExercises(snapshot.val()));
    id &&
      db
        .collection('users')
        .doc(id)
        .collection('exercises')
        .get()
        .then(qs => qs.forEach(q => setExercises(v => [...v, q.data()])));
  }, [id]);

  return (
    <Centered title="Home" subTitle="Welcome to Exercise Breks">
      <Title level={1}>Exercises</Title>
      <Divider />
      <List>
        {exercises.map(exercise => (
          <List.Item>
            <Exercise
              name={exercise.name}
              duration={exercise.duration}
              quantity={exercise.quantity}
            />
          </List.Item>
        ))}
      </List>
    </Centered>
  );
};
