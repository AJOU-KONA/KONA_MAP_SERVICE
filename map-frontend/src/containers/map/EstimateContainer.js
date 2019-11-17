import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {number} from "prop-types";

const CustomFormCheck = ({label, number}) => {
    return (
        <Form.Check
            custom
            inline
            label={number}
            type="checkbox"
            id={`custom-inline-checkbox-${label}-${number}`}
        />
    );
};

const CustomForm = ({label}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            {[1, 2, 3, 4, 5].map(number => (<CustomFormCheck label={label} number={number}/>))}
        </Form.Group>
    )
};

const EstimateContainer = () => {
    return (
        <>
            <Form>
                <CustomForm label="신뢰도"/>
                <CustomForm label="유용도"/>
                <CustomForm label="신선도"/>
                <CustomForm label="적절함"/>
                <Form.Group>
                    <Form.Label>종합</Form.Label>
                    <Form.Check custom
                                inline
                                label="좋아요"
                                type="checkbox"
                                id={`custom-inline-checkbox-good`}/>
                    <Form.Check custom
                                inline
                                label="싫어요"
                                type="checkbox"
                                id={`custom-inline-checkbox-bad`}/>
                </Form.Group>
                <Button variant="outline-info">평가 등록</Button>
            </Form>
        </>
    );
};

export default EstimateContainer;