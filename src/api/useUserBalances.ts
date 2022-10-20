import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
    username: string;
};

async function fetch(params: Params) {
    const { auth, username } = params;

    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/admin/user/${username}/balances`, {
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
    return useQuery<Dashboard.Balance[], Error>(['userBalancesAdmin', params], () => fetch(params), options);
}
