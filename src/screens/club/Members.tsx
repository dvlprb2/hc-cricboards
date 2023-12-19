import { SearchBar } from '../../components/SearchBar';
import { Badge, Box, Heading, HStack, Spacer, Text, VStack, Button, Fab, FormControl, Input, Modal } from 'native-base';
import { FlatList } from 'react-native';
import React, { useState, useRef } from 'react';
import { EmptyList } from '../../components/EmptyList';
import {
  MemberDocumentData,
  createMember,
} from '../../services/clubs';
import { getCurrentUser } from '../../services/auth';
import { getTodayDate } from '../../utils';
import {Plus} from 'react-native-feather';

interface MemberData {
  id: string;
  name: string;
  joinDate: string;
  matches: string;
}

export const MembersTab: React.FC = () => {
  const initialRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const renderItem = ({ item }: { item: MemberData }) => {
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
            _text={{ fontSize: 'sm' }}
            alignSelf="center">
            {item.matches}
          </Badge>
        </HStack>
      </Box>
    );
  };

  const onModalClose = () => {
    setShowModal(false);
    setIsInvalid(false);
    setMemberName('');
  };

  const handleAddMember = async () => {
    if (memberName.length < 3) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);

      const currentUser = await getCurrentUser();

      createMember({
        name: memberName,
        clubs: ['LDQf2R0yHbhW5AleRrHG'],
        joinDate: getTodayDate(),
        matches: 0
      }).then(r => {
        console.log(r.id);
        onModalClose();
      });
    }
  };

  const data: MemberData[] = [
    {
      id: '1',
      name: 'Bittu Patel',
      joinDate: 'June 16, 2023',
      matches: '11 MATCHES',
    },
    {
      id: '2',
      name: 'Smit',
      joinDate: 'May 25, 2023',
      matches: '25 MATCHES',
    },
    {
      id: '3',
      name: 'Rahul Shah',
      joinDate: 'May 02, 2023',
      matches: '2 MATCHES',
    },
    {
      id: '4',
      name: 'Dhruv Jani',
      joinDate: 'February 02, 2023',
      matches: '9 MATCHES',
    },
    {
      id: '5',
      name: 'Sachin Patel',
      joinDate: 'March 31, 2023',
      matches: '18 MATCHES',
    },
    {
      id: '6',
      name: 'Jigar Patel',
      joinDate: 'January 15, 2023',
      matches: '45 MATCHES',
    },
    {
      id: '7',
      name: 'Soury Patel',
      joinDate: 'March 12, 2023',
      matches: '26 MATCHES',
    },
    {
      id: '8',
      name: 'Montu Patel',
      joinDate: 'May 09, 2023',
      matches: '5 MATCHES',
    },
    {
      id: '9',
      name: 'Ronak Soni',
      joinDate: 'June 02, 2023',
      matches: '7 MATCHES',
    },
  ];

  return (
    <>
      <FlatList
        keyExtractor={item => item.id}
        data={data}
        ListHeaderComponent={<SearchBar my={3} />}
        ListEmptyComponent={<EmptyList />}
        renderItem={renderItem}
      />

      <Fab
        renderInPortal={true}
        shadow={2}
        placement="bottom-right"
        size="sm"
        colorScheme="primary"
        icon={<Plus color="#fff" />}
        label={
          <Text fontWeight={600} fontSize="sm" color="white">
            New Member
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
          <Modal.Header>Create New Member</Modal.Header>
          <Modal.Body>
            <HStack space={2}>
              <FormControl isInvalid={isInvalid}>
                <Input
                  onChangeText={text => setMemberName(text)}
                  size="lg"
                  flex={1}
                  placeholder="Enter name"
                  ref={initialRef}
                  value={memberName}
                />
                <FormControl.ErrorMessage>
                  Name is too short
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="full"
              p={2}
              _text={{ fontSize: 18 }}
              onPress={handleAddMember}>
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
