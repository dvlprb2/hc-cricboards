import {SearchBar} from '../../components/SearchBar';
import {
  Badge,
  Box,
  Fab,
  Heading,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import {FlatList} from 'react-native';
import React from 'react';
import {EmptyList} from '../../components/EmptyList';
import {Feather} from '@expo/vector-icons';

interface MemberData {
  id: string;
  name: string;
  joinDate: string;
  matches: string;
}


export const MembersTab: React.FC<{navigation: any}> = ({navigation}) => {
  const renderItem = ({item}: {item: MemberData}) => {
    return (
      <Box borderBottomWidth="1" borderColor="coolGray.300" px={4} py={2}>
        <HStack>
          <VStack space={1}>
            <Heading size="sm" fontWeight="500">
              {item.name}
            </Heading>
            <Text fontSize="xs" color="coolGray.600">
              {item.joinDate}
            </Text>
          </VStack>
          <Spacer />
          <Badge
            variant="subtle"
            colorScheme="secondary"
            _text={{fontSize: 'sm'}}
            alignSelf="center">
            {item.matches}
          </Badge>
        </HStack>
      </Box>
    );
  };

  return (
    <>
      <FlatList
        keyExtractor={item => item.id}
        //datd = 
        ListHeaderComponent={<SearchBar my={3} />}
        ListEmptyComponent={<EmptyList />}
        renderItem={renderItem}
      />
    </>
  );
};
