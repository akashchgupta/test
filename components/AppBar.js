import React from 'react';
import {Appbar} from 'react-native-paper';
import upload from '../utils/upload';

export default class AppBar extends React.Component {
  render() {
    const {currentPath} = this.props;

    return (
      <Appbar.Header>
        <Appbar.Content title="DBCloud Sync" />
        <Appbar.Action
          icon="upload"
          onPress={currentPath !== null ? () => upload(currentPath) : () => {}}
        />
        <Appbar.Action icon="home" onPress={() => this.props.homePress('')} />
        <Appbar.Action
          icon="refresh"
          onPress={
            currentPath !== null
              ? () => this.props.homePress(currentPath)
              : () => {}
          }
        />
      </Appbar.Header>
    );
  }
}
