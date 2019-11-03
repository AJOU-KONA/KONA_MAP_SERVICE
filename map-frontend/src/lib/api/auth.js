import client from "./client";


export const login = ( {username, password}) =>
    client.post('/api/auth/login', {username, password});

export const register = ({username, password, livingArea, gender, age, job, wanted, providingInfo}) =>
    client.post('/api/auth/register', {username, password, livingArea,
        gender, age, job, wanted, providingInfo});

export const fetchUserData = ({username, id}) => client.get(`/api/auth/userInfo/${id}`);

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');



