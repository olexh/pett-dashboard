import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
    page: number;
};

interface Response {
    pagination: {
        pages: number;
        total: number;
        current: number;
    };
    list: Dashboard.History[];
}

async function fetch(params: Params) {
    const { auth, page } = params;

    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/user/history`, {
            headers: { auth },
            params: { page },
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
    return useQuery<Response, Error>(['history', params], () => fetch(params), options);
}
