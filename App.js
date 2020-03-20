import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import ListingFolder from './components/ListingFolder';

export default class App extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <ListingFolder prevPath={null} currentPath="" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
