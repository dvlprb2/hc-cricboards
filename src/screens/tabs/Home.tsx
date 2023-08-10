import React, {useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {
  Button,
  Fab,
  FormControl,
  Heading,
  HStack,
  Input,
  Modal,
  Text,
  VStack,
} from 'native-base';
import {ClubCard} from '../../components/ClubCard';
import {MatchCard} from '../../components/MatchCard';
import {Plus} from 'react-native-feather';

interface HomeScreenProps {
  navigation: any; // Replace 'any' with the actual navigation prop type
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const initialRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [clubName, setClubName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [clubData] = useState(clubs);
  const [recentMatchData] = useState(recentMatches);

  const renderClubCard = ({item}: {item: any}) => (
    <ClubCard item={item} navigation={navigation} />
  );

  const renderMatchCard = ({item}: {item: any}) => (
    <MatchCard item={item} navigation={navigation} />
  );

  const onModalClose = () => {
    setShowModal(false);
    setIsInvalid(false);
    setClubName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack margin={3} space={3}>
        <Heading fontWeight={600} size="md">
          Clubs
        </Heading>
        <FlatList
          horizontal
          data={clubData}
          renderItem={renderClubCard}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </VStack>

      <VStack margin={3} space={3}>
        <Heading fontWeight={600} size="md">
          Recent Matches
        </Heading>
        <FlatList
          horizontal
          data={recentMatchData}
          renderItem={renderMatchCard}
          showsHorizontalScrollIndicator={false}
        />
      </VStack>

      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="lg"
        colorScheme="primary"
        icon={<Plus color="#fff" />}
        label={
          <Text fontWeight={600} fontSize="xl" color="white">
            New Club
          </Text>
        }
        onPress={() => setShowModal(true)}
      />

      <Modal
        isOpen={showModal}
        onClose={onModalClose}
        initialFocusRef={initialRef}
        avoidKeyboard
        safeAreaTop>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Create New Club</Modal.Header>
          <Modal.Body>
            <HStack space={2}>
              <FormControl isInvalid={isInvalid}>
                <Input
                  onChangeText={text => setClubName(text)}
                  size="lg"
                  flex={1}
                  placeholder="Enter name"
                  ref={initialRef}
                  value={clubName}
                />
                <FormControl.ErrorMessage>
                  Name is too short
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button size="full" p={2} _text={{fontSize: 18}}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const clubs = [
  {
    name: 'Club 1',
    members: 11,
  },
  {
    name: 'Club 2',
    members: 14,
  },
  {
    name: 'Club 3',
    members: 25,
  },
  {
    name: 'Club 4',
    members: 56,
  },
];

const recentMatches = [
  {
    club: 'Club 1',
    teamA: '100-9 (20)',
    teamB: '100-9 (20)',
    msg: 'Team A won by 2 wkts',
  },
  {
    club: 'Club 2',
    teamA: '100-9 (20)',
    teamB: '100-9 (20)',
    msg: 'Team B won by 2 wkts',
  },
  {
    club: 'Club 1',
    teamA: '100-9 (20)',
    teamB: '100-9 (20)',
    msg: 'Team A won by 2 wkts',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
