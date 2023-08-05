import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, Heading, Text, VStack} from 'native-base';

interface ProfileScreenProps {
  navigation: any; // Replace 'any' with the appropriate type for the navigation prop
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false}>
        <VStack margin={5} justifyContent="center" alignItems="center">
          <Avatar alignSelf="center" size="2xl" marginBottom={4}>
            JD
          </Avatar>
          <Heading color="coolGray.700">John Doe</Heading>
          <Text color="coolGray.500">johndoe@gmail.com</Text>
          <Button
            variant="link"
            color="primary.600"
            size="sm"
            _text={{fontSize: 16}}
            onPress={handleLogout}>
            Logout
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
