import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

export default function JSONFeedScreen(props) {
  const [dataArray, setDataArray] = useState([]);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  React.useEffect(() => {
    loadDataWithPost();
  }, []);

  const loadDataWithPost = async () => {
    let regUsername = 'admin'; // await AsyncStorage.getItem('username')
    let regPassword = 'password'; // await AsyncStorage.getItem('password')
    // urlencoded
    let data = `username=${regUsername}&password=${regPassword}&type=foods`;

    const url = 'http://codemobiles.com/adhoc/youtubes/index_new.php';
    let result = await axios.post(url, data);
    console.log(JSON.stringify(result.data));
    setDataArray(result.data.youtubes);
  };

  renderRow = ({ item, index }) => (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => {
        props.navigation.navigate('Youtube', { item });
      }}>
      {/* Avatar and title, subtitle */}
      <View style={styles.listCardView}>
        {/* Avatar */}
        <Image style={styles.listAvatar} source={{ uri: item.avatar_image }} />

        {/* Title and Subtitle */}
        <View style={styles.listTitleSubtitleContainer}>
          <Text style={styles.listTitle}>{item.title}</Text>
          <Text style={styles.listSubTitle}>{item.subtitle}</Text>
        </View>
      </View>

      {/* Youtube Image */}
      <Image
        style={styles.listYoutbeImage}
        source={{ uri: item.youtube_image }}
      />
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <Image
      source={require('./assets/img/header_react_native.png')}
      resizeMode="contain"
      style={{ height: 100, width: '100%' }}
    />
  );

  const refresh = () => {
    setIsRefreshing(true);
    setDataArray([]);

    setTimeout(async () => {
      await loadDataWithPost();
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/img/bg.png')}>
      <FlatList
        refreshing={isRefreshing}
        onRefresh={refresh}
        ListHeaderComponent={renderHeader}
        data={dataArray ? dataArray : []}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_header: {
    width: '100%',
    height: 100,
  },
  listCard: {
    overflow: 'hidden',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 0,
  },
  listCardView: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 45,
    alignItems: 'center',
  },
  listAvatar: {
    width: 45,
    height: '100%',
    marginRight: 16,
  },
  listTitleSubtitleContainer: {
    flexDirection: 'column',
    marginRight: 16,
    flex: 1,
  },
  listTitle: {
    fontWeight: '700',
  },
  listSubTitle: {
    fontWeight: '100',
  },
  listYoutbeImage: {
    width: '100%',
    height: 190,
  },
});
