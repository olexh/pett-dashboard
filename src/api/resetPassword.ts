import axios from 'axios';

interface Params {
    email: string;
}

export default async function (params: Params) {
    try {
        const { data: response } = await axios.post(`${axios.defaults.baseURL}/auth/reset`, params);

        return response;
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
