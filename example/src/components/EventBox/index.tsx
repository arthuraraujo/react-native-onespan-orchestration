import React from 'react';

import {Container, Text} from './styles';

interface Props {
    data: string;
}

const EventBox = ({data}: Props) => (
    <Container>
        <Text> {data}</Text>
    </Container>
);

export default EventBox;
