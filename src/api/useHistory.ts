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
    list: PettDashboard.History[];
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
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<Response, Error>(['history', params], () => fetch(params), options);
}
