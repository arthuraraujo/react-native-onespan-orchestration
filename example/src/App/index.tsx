import React, { useState, useEffect } from 'react';

import {
  Container,
  FormWrapper,
  Button,
  Eventbox,
  View,
  Text,
  BoxText,
  Spacer,
} from './styles';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { OnespanBridgeAndroid } = NativeModules;
// import Input from '../components/Input';
// import EventBox from '../components/EventBox';

import { TextInput } from 'react-native-paper';

const App = () => {
  const [accountIdentifierUser, setAccountIdentifierUser] = useState(
    'sybrandreinders-vort'
  );
  const [accountIdentifierDomain, setAccountIdentifierDomain] = useState(
    'sdb.tid.onespan.cloud'
  );
  const [activationUser, setActivationUser] = useState('felipe102');
  const [activationPassword, setActivationPassword] = useState('Test1234');

  const [isIdentified, setIsIdentified] = useState(false);

  const [log, setLog] = useState<string[]>([]);

  let logLocal: string[] = [''];

  const registerEvent = (event) => {
    if (logLocal) {
      logLocal =
        logLocal[0] === '' ? [event.status] : [...logLocal, event.status];
      console.log({ logLocal });
    } else {
      console.log('logLocal dont exist');
    }
    console.log(`Log: ${event.status}`);

    setLog(logLocal);

    // console.log({logCompleto: log});
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(OnespanBridgeAndroid);
    const subscription = eventEmitter.addListener(
      'onStatusEvent',
      registerEvent
    );
    return () => subscription.remove();
    // const subscription = subscribe(aff);
    // return () => subscription.remove();
  }, []);

  const setIdentifier = () => {
    setIsIdentified(true);
  };
  const activateUser = () => {
    OnespanBridgeAndroid.setAccountIdentifier(
      accountIdentifierUser,
      `.${accountIdentifierDomain}`
    );
    OnespanBridgeAndroid.startActivation(activationUser, activationPassword);
    setIsIdentified(false);
  };

  const IdentifierForm = () => (
    <View>
      <TextInput
        onChangeText={(text) => setAccountIdentifierUser(text)}
        defaultValue={accountIdentifierUser}
      />
      <Spacer />
      <TextInput
        onChangeText={(text) => setAccountIdentifierDomain(text)}
        defaultValue={accountIdentifierDomain}
      />
      <Spacer />
      <Button onPress={setIdentifier}>Set Identifier</Button>
    </View>
  );
  const ActivationForm = () => (
    <View>
      <TextInput
        onChangeText={(text) => setActivationUser(text)}
        defaultValue={activationUser}
      />
      <Spacer />
      <TextInput
        onChangeText={(text) => setActivationPassword(text)}
        defaultValue={activationPassword}
      />
      <Spacer />
      <Button onPress={activateUser}>Activate</Button>
    </View>
  );
  const EventBox = () => (
    <Eventbox>
      {!!log &&
        log.length > 0 &&
        log.map((l, i) => <BoxText key={`${i}`}> &gt; {l}</BoxText>)}
    </Eventbox>
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
