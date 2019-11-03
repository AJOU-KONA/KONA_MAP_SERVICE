import { createAction, handleActions} from 'redux-actions';
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =  createRequestActionTypes('auth/REGISTER',);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
const [FETCH_USER_DATA, FETCH_USER_DATA_SUCCESS, FETCH_USER_DATA_FAILURE] = createRequestActionTypes('auth/FETCH_USER_DATA');

export const changeField = createAction(
    CHANGE_FIELD,
    ({form, key, value}) => ({
        form, key, value
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const register = createAction(REGISTER, ({ username, password, livingArea,
                                                    gender, age, job, wanted, providingInfo}) => ({
    username, password, livingArea, gender, age, job, wanted, providingInfo
}));
export const login = createAction(LOGIN, ({username, password}) => ({
    username, password,
}));
export const fetchUserData = createAction(FETCH_USER_DATA, (
    {username, livingArea, gender, age, job, wanted, providingInfo }) =>
    ({username, livingArea, gender, age, job, wanted, providingInfo
    }));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const fetchUserDataSaga = createRequestSaga(FETCH_USER_DATA, authAPI.fetchUserData);

export function* authSaga(){
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(FETCH_USER_DATA, fetchUserData);
}

const initialState = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
        livingArea: '',
        gender: '',
        age: '',
        job: '',
        wanted : [],
        providingInfo : true
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value}}) =>
            produce(state, draft => {
                draft[form][key] = value;
            }),
        [INITIALIZE_FORM]: (state, { payload: form}) => ({
            ...state,
            [form]: initialState[form],
            authError: null,
        }),
        [REGISTER_SUCCESS]: (state, {payload : auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        [REGISTER_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError:null,
            auth,
        }),
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;
