import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Params = {
    auth: string;
    username: string;
};

async function fetch(params: Params) {
    const { auth, username } = params;

    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/admin/user/${username}`, {
            headers: { auth },
        });
        return data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export default function (params: Params, options?: Record<string, any>) {
    return useQuery<PettDashboard.User, Error>(['userInfoAdmin', params], () => fetch(params), options);
}
