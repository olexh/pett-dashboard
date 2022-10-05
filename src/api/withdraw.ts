import axios from 'axios';

interface Params {
    auth: string;
    data: { amount: number; address: string; ticker: string };
}

const withdraw = async (params: Params) => {
    const { auth, data } = params;

    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/finance/withdrawal`,
            { ...data },
            { headers: { auth } },
        );

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default withdraw;
