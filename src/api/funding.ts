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
        console.error(e);
        throw e;
    }
}
