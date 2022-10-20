import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
};

async function fetch(params: Params) {
    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/user/profile`, {
            headers: { Auth: params.auth },
        });
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.error(e.response?.data);

            if (e.response?.data) {
                throw e.response?.data;
            } else {
                throw e;
            }
        } else {
            console.error('unexpected error: ', e);

            throw e;
        }
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<any, Error>(['profile', params], () => fetch(params), options);
}
