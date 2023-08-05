import React, {useState} from 'react';
import {Animated, Dimensions, Pressable, StatusBar} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {Box, Fab, Icon, Text} from 'native-base';
import {MatchesTab} from './Matches';
import {Feather} from '@expo/vector-icons';

const initialLayout = {
  width: Dimensions.get('window').width,
};

const renderScene = SceneMap({
  first: MembersTab,
});

export const ClubScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Members',
    },
    {
      key: 'second',
      title: 'Matches',
    },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const color = index === i ? '#000' : '#1f2937';
          const borderColor = index === i ? 'primary.600' : 'coolGray.200';
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3">
              <Pressable
                onPress={() => {
                  console.log(i);
                }}>
                <Animated.Text style={{color}}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{marginTop: StatusBar.currentHeight}}
      />
      <Fab
        renderInPortal={true}
        shadow={2}
        placement="bottom-right"
        size="lg"
        colorScheme="primary"
        icon={<Icon color="white" as={Feather} name="plus" size="2xl" />}
        label={
          <Text fontWeight={600} fontSize="xl" color="white">
            New Match
          </Text>
        }
      />
    </>
  );
};
