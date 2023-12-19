import { Badge, Box, Button, Fab, FormControl, HStack, Heading, Input, Modal, Spacer, Text, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Plus } from 'react-native-feather';
import { EmptyList } from '../../components/EmptyList';
import { SearchBar } from '../../components/SearchBar';
import {
  MemberDocumentData,
  createMember,
  getMembersByClub,
} from '../../services/clubs';
import { getTodayDate } from '../../utils';

export const MembersTab: React.FC = () => {
  const initialRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [members, setMembers] = useState<MemberDocumentData[]>([]);


  useEffect(() => {
    getMembersByClub().then(querySnapshot => {
      const data: MemberDocumentData[] = [];
      querySnapshot.forEach(doc => data.push(doc.data() as MemberDocumentData));
      console.log(data)
      setMembers(data);
    });
  }, [!showModal]);

  const renderItem = ({ item }: { item: MemberDocumentData }) => {
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
            {`${item.matches} MATCHES`}
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

  return (
    <>
      <FlatList
        keyExtractor={item => item.name + Date.now()}
        data={members}
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
