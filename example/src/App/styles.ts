import styled from 'styled-components/native';
import {Button as BT} from 'react-native-paper';

export const Container = styled.View`
    flex: 1;
    padding: 30px;
    justify-content: center;
    background-color: #f5f5f5;
`;

export const Button = styled(BT).attrs({
    mode: 'contained',
})`
    width: 100%;
`;

export const FormWrapper = styled.View``;
