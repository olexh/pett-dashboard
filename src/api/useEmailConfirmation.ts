import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//TODO: move to types
interface Params {
    token?: string;
}

async function fetch(params: Params) {
    try {
        const { data } = await axios.post(`${axios.defaults.baseURL}/auth/activate`, { token: params.token });
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
    return useQuery<Params, Error>(['emailConfirmation', params], () => fetch(params), options);
}
