import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
};

async function fetch(params: Params) {
    const { auth } = params;

    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/user/balances`, { headers: { auth } });
        return data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<PettDashboard.Balance[], Error>(['balances', params], () => fetch(params), options);
}
