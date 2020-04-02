import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const Exercise = ({ name, duration, quantity }) => (
  <Text>
    {duration
      ? `${name} for ${duration} seconds`
      : `${quantity} x ${name}`}
  </Text>
);
