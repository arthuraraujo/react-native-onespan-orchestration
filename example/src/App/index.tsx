import * as React from 'react';

import { useForm } from 'react-hook-form';
import { multiply } from 'react-native-onespan-orchestration';
import { Container, FormWrapper, Button } from './styles';
import Input from '../components/Input';

const App = () => {
  const [result, setResult] = React.useState<number | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({});

  const handleAuth = (data: FormData) => {};

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <Container>
      <FormWrapper>
        <Input control={control} name="id" label="Id" />
        <Input control={control} name="name" label="Nome" />
        <Button>Enviar</Button>
      </FormWrapper>
    </Container>
  );
};

export default App;
