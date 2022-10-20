import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
};

interface Response {
    users: {
        total: number;
        banned: number;
        admin: number;
    };
    coins: {
        available: number;
        frozen: number;
        fundings: number;
        coin: Dashboard.Coin;
        usd: { withdrawals: number; available: number; frozen: number; fundings: number };
        withdrawals: number;
    }[];
}

async function fetch(params: Params) {
    const { auth } = params;

    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/admin/stats`, {
            headers: { auth },
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
    return useQuery<Response, Error>(['adminHistory', params], () => fetch(params), options);
}
