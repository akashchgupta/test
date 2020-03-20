import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const Loader = () => (
  <ActivityIndicator
    style={{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    }}
    animating={true}
    color={Colors.red800}
    size={45}
  />
);

export default Loader;
