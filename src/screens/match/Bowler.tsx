import React, {useState} from 'react';
import {
  Checkbox,
  Fab,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Text,
  useToast,
  VStack,
} from 'native-base';
import {Pressable, Vibration} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { ArrowRight, Plus } from "react-native-feather";

interface Player {
  id: number;
  name: string;
  isChecked: boolean;
}

const players: Player[] = [
  {
    id: 1,
    name: 'Player 1',
    isChecked: false,
  },
  {
    id: 2,
    name: 'Player 2',
    isChecked: false,
  },
  {
    id: 3,
    name: 'Player 3',
    isChecked: false,
  },
];

export const BowlerScreen: React.FC<any> = ({navigation}) => {
  const initialRef = React.useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = React.useState<Player[]>(players);
  const toast = useToast();
  const toastIdRef = React.useRef<any>(null);
  const [count, setCount] = useState(1);

  const handleChecked = (index: number) => {
    if (count <= 2) {
      setList(prevList => {
        const newList = [...prevList];
        newList[index].isChecked = !newList[index].isChecked;
        return newList;
      });
      setCount(count + 1);
      console.log(count);
    } else {
      if (!toast.isActive('error-check')) {
        toastIdRef.current = toast.show({
          id: 'error-check',
          title: 'You can only select 2 players',
          bg: 'danger.600',
        });
      }
      Vibration.vibrate(1000);
    }
  };

  return (
    <>
      <VStack space="2.5" p="4">
        <VStack space={2} borderRadius="sm" mb={1}>
          {list.map((item, itemI) => (
            <Pressable key={item.id} onPress={() => handleChecked(itemI)}>
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                bg={item.isChecked ? 'secondary.50' : 'white'}
                borderColor={'primary.600'}
                borderWidth="1"
                borderRadius="sm"
                px="12px"
                py="8px"
                borderStyle="solid">
                <Checkbox
                  isChecked={item.isChecked}
                  size="lg"
                  colorScheme="primary"
                  value={item.name}
                  onChange={() => handleChecked(itemI)}
                  aria-label="checkbox"
                />
                <Text
                  fontSize="xl"
                  width="100%"
                  flexShrink={1}
                  fontWeight="semibold"
                  textAlign="left"
                  pl="2"
                  _light={{color: 'primary.600'}}>
                  {item.name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>

      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-left"
        size="lg"
        colorScheme="primary"
        icon={<Plus color="#fff" />}
        onPress={() => setShowModal(true)}
      />

      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="lg"
        colorScheme="primary"
        icon={<ArrowRight color="#fff" />}
        onPress={() => navigation.navigate('Innings')}
      />

      <Modal
        isOpen={showModal}
        size="md"
        animationPreset="slide"
        onClose={() => setShowModal(false)}
        initialFocusRef={initialRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add Player</Modal.Header>
          <Modal.Body>
            <HStack space={2}>
              <Input
                size="lg"
                flex={1}
                placeholder="Enter name"
                ref={initialRef}
              />
              <IconButton
                size="lg"
                borderRadius="sm"
                variant="solid"
                colorScheme={'primary'}
                icon={<Plus color="#fff" />}
              />
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};
