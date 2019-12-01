import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {IoIosThumbsUp, IoIosThumbsDown} from 'react-icons/io';
import {AiFillAlert} from 'react-icons/ai';
import {Button, Form,Row} from "react-bootstrap";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {addWarning} from "../../modules/auth";

const ButtonWrapper = styled.div`
    padding-left: 5px;
`;

const CustomFormCheck = ({label, number}) => {
    const [value, setValue] = useState(null);

    const onClick = useCallback(
        () => {
            if (value) setValue(false);
            else setValue(true);
        }, [value]);

    return (
        <Form.Check
            custom
            inline
            label={number}
            onClick={onClick}
            type="checkbox"
            id={`custom-inline-checkbox-${label}-${number}`}
        />
    );
};

const CustomForm = ({label}) => {

    return (
        <Form.Group style={{paddingLeft: 10}}>
            <Form.Label style={{paddingRight: 10}}>{label}</Form.Label>
            {[1, 2, 3, 4, 5].map((number, index) => (<CustomFormCheck key={index} label={label} number={number}/>))}
        </Form.Group>
    )
};

const initialState = {
    warning : false
};

const EstimateReducer = (state, action) => {
    switch (action.type) {
        case 'reset' : {
            return initialState;
        }
        case 'addWarning' : {
            return {...state, warning : !state.warning};
        }
        default: {
            throw new Error(`unexpected action.type: ${action.type}`)
        }
    }
};

const EstimateContainer = ({info}) => {
    const [localState, setLocalState] = useReducer(EstimateReducer, initialState);
    const {username} = useSelector(({user}) => ({
        username: user.user.username
    }));

    const dispatch = useDispatch();

    const onWarningClick = useCallback( () => {
        if(info.username === username) return;
        setLocalState({type:'addWarning'})}, [localState.warning]);

    useEffect(()=>{
        if(localState.warning){
            dispatch(addWarning(info.username));
        }
    }, [localState.warning]);

    return (
        <>
            <Form>
                <CustomForm label="신뢰도"/>
                <CustomForm label="유용도"/>
                <CustomForm label="만족도"/>
                <Row style={{paddingLeft: 30}}>
                    <ButtonWrapper>
                        <Button><IoIosThumbsUp/>좋아요</Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button><IoIosThumbsDown/>싫어요</Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button onClick={onWarningClick}><AiFillAlert/>신고</Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button variant="outline-info">평가 등록</Button>
                    </ButtonWrapper>
                </Row>

            </Form>
        </>
    );
};

export default EstimateContainer;
