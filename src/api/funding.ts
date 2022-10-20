import axios from 'axios';

interface Params {
    auth: string;
    req: { amount: number; username: string; ticker: string; timelock?: number };
}

export default async function (params: Params) {
    const { auth, req } = params;

    try {
        const { data: response } = await axios.post(`${axios.defaults.baseURL}/admin/funding`, req, {
            headers: { auth },
        });
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
