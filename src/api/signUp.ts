import axios from 'axios';

interface Params {
    data: { email: string; username: string; password: string; phone_number: string };
}

export default async function (params: Params) {
    const { data } = params;

    try {
        const { data: response } = await axios.post(`${axios.defaults.baseURL}/auth/join`, data);

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
