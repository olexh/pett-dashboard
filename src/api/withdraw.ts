import axios from 'axios';

interface Params {
    auth: string;
    data: { amount: number; address: string; ticker: string };
}

export default async function (params: Params) {
    const { auth, data } = params;

    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/finance/withdrawal`,
            { ...data },
            { headers: { auth } },
        );

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
