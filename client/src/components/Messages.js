import React from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled'
import { clearMessages } from '../lib/redux/actions';

const Message = styled.div`
    color: white;
    border: 1px solid darkred;
    background: red;
    padding: 20px;
`;

const InternalMessages = ({messages, dispatch}) => {
    return (
        <div>
            {messages.map((m,i) => 
                <Message key={i}>
                    {m}
                    <span onClick={() => dispatch(clearMessages())}>(x)</span>
                </Message>
            )}
        </div>
    )
};

export const Messages = connect(state => ({messages: state.messages}))(InternalMessages);