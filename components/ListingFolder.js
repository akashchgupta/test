import React, {Component} from 'react';
import {Card, Avatar, Button, Text} from 'react-native-paper';
import {StyleSheet, Dimensions} from 'react-native';

import fetchListing from '../utils/fetchListing';
import downloadZip from '../utils/downloadZip';
import downloadFile from '../utils/downloadFile';
import AppBar from './AppBar';
import Loader from './Loader';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const ViewTypes = {
  FULL: 0,
};

export default class ListingFolder extends Component {
  constructor(props) {
    super(props);

    let {width} = Dimensions.get('window');

    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      index => ViewTypes.FULL,
      (type, dim) => {
        dim.height = 100;
        dim.width = width;
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);
    this.handleChangePath = this.handleChangePath.bind(this);

    const {currentPath, prevPath} = this.props;

    this.state = {
      dataProvider: dataProvider.cloneWithRows([]),
      errorOccured: false,
      currentPath: currentPath,
      prevPath: prevPath,
      emptyDirectory: false,
      isLoading: false,
    };
  }

  _rowRenderer(type, data) {
    const color = data['.tag'] === 'folder' ? 'orange' : '#FB6892';
    const buttonText = data['.tag'] === 'folder' ? 'zip' : '';
    const itemType = data['.tag'];
    return (
      <Card
        style={styles.card}
        onPress={
          itemType === 'file'
            ? null
            : () =>
                this.handleOnPress({
                  prevPath: this.state.currentPath,
                  currentPath: data.path_display,
                })
        }>
        <Card.Title
          key={data.id}
          title={data.name}
          subtitle={data.path_display}
          path={data.path_display}
          left={props => (
            <Avatar.Icon {...props} color={color} icon={itemType} />
          )}
          right={props => (
            <Button
              icon="download"
              mode="text"
              onPress={
                itemType === 'folder'
                  ? () => downloadZip(data.path_display, data.name)
                  : () => downloadFile(data.path_display, data.name)
              }>
              {buttonText}
            </Button>
          )}
        />
      </Card>
    );
  }

  async handleOnPress({prevPath, currentPath}) {
    await this.setState({prevPath, currentPath});
    this.fetchAndUpdate(this.state.currentPath);
  }

  updateDataProvider(data) {
    if (data.entries.length === 0) {
      this.setState(prevState => ({
        dataProvider: prevState.dataProvider.cloneWithRows(data.entries),
        errorOccured: false,
        emptyDirectory: true,
        isLoading: false,
      }));
    } else {
      this.setState(prevState => ({
        dataProvider: prevState.dataProvider.cloneWithRows(data.entries),
        errorOccured: false,
        isLoading: false,
      }));
    }
  }

  async handleChangePath(currentPath) {
    await this.setState({currentPath});
    this.fetchAndUpdate(this.state.currentPath);
  }

  fetchAndUpdate(path) {
    this.setState({isLoading: true});
    fetchListing(path)
      .then(res => this.updateDataProvider(res))
      .catch(error => this.setState({errorOccured: true}));
  }

  componentDidMount() {
    this.fetchAndUpdate(this.state.currentPath);
  }

  render() {
    const size = this.state.dataProvider.getSize();

    if (this.state.errorOccured)
      return (
        <>
          <AppBar homePress={this.handleChangePath} />
          <Text>Sorry!! some error occured.</Text>
        </>
      );

    if (size === 0) {
      if (this.state.emptyDirectory) {
        return (
          <>
            <AppBar
              currentPath={this.state.currentPath}
              homePress={this.handleChangePath}
            />
            <Text>Empty Directory.</Text>
          </>
        );
      } else {
        return (
          <>
            <AppBar
              currentPath={this.state.currentPath}
              homePress={this.handleChangePath}
            />
            <Loader />
          </>
        );
      }
    } else if (size !== 0 && this.state.isLoading) {
      return (
        <>
          <AppBar
            currentPath={this.state.currentPath}
            homePress={this.handleChangePath}
          />
          <Loader />
        </>
      );
    } else {
      return (
        <>
          <AppBar
            currentPath={this.state.currentPath}
            homePress={this.handleChangePath}
          />
          <RecyclerListView
            showsVerticalScrollIndicator={false}
            dataProvider={this.state.dataProvider}
            layoutProvider={this._layoutProvider}
            rowRenderer={this._rowRenderer}
          />
        </>
      );
    }
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 3,
    paddingRight: 5,
  },
});
