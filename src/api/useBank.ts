import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

//TODO: move to types
interface Response {
    depositor: string;
    account: string;
    bank: string;
}

async function fetch() {
    try {
        const { data } = await axios.get(`${axios.defaults.baseURL}/system/bank`);

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

export default function (options?: Record<string, any>) {
    return useQuery<Response, Error>(['bank'], () => fetch(), options);
}
