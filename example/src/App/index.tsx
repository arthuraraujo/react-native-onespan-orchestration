import React, { useState, useEffect } from 'react';

import { Container, FormWrapper, Button } from './styles';
import {
  setAccountIdentifier,
  startActivation,
  eventEmitter,
} from 'react-native-onespan-orchestration';

import { View, Text } from 'react-native';

import { TextInput } from 'react-native-paper';

const App = () => {
  useEffect(() => {
    const eE = eventEmitter;
    const subscription = eE.addListener('onStatusEvent', onStatusEvent);
    return () => subscription.remove();
  }, []);

  const [accountIdentifierUser, setAccountIdentifierUser] = useState(
    'sybrandreinders-vort'
  );
  const [accountIdentifierDomain, setAccountIdentifierDomain] = useState(
    'sdb.tid.onespan.cloud'
  );
  const [activationUser, setActivationUser] = useState('felipe102');
  const [activationPassword, setActivationPassword] = useState('Test1234');

  const [isIdentified, setIsIdentified] = useState(false);

  const { log, setLog } = useState([]);

  const onStatusEvent = (event) => {
    console.log(event.status);
    // setLog([...log, event.status]);
  };

  const setIdentifier = () => {
    setAccountIdentifier(accountIdentifierUser, `.${accountIdentifierDomain}`);
    setIsIdentified(true);
  };
  const activateUser = () => {
    startActivation(activationUser, activationPassword);
  };

  const IdentifierForm = () => (
    <View>
      <TextInput
        onChangeText={(text) => setAccountIdentifierUser(text)}
        defaultValue={accountIdentifierUser}
      />
      <TextInput
        onChangeText={(text) => setAccountIdentifierDomain(text)}
        defaultValue={accountIdentifierDomain}
      />
      <Button onPress={setIdentifier}>Set Identifier</Button>
    </View>
  );

  const ActivationForm = (): JSX.Element => {
    return (
      <View>
        <TextInput
          onChangeText={(text) => setActivationUser(text)}
          defaultValue={activationUser}
        />
        <TextInput
          onChangeText={(text) => setActivationPassword(text)}
          defaultValue={activationPassword}
        />
        <Button onPress={activateUser}>Activate</Button>
      </View>
    );
  };
  const EventBox = () => (
    <View>
      {log?.map((l, i) => (
        <Text key={`${i}`}>{l}</Text>
      ))}
    </View>
  );

  return (
    <Container>
      <FormWrapper>
        <EventBox />
        {isIdentified ? <ActivationForm /> : <IdentifierForm />}
      </FormWrapper>
    </Container>
  );
};

export default App;
