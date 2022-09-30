import axios from 'axios';

interface Params {
    data: { email: string; password: string };
}

const withdraw = async (params: Params) => {
    const { data } = params;

    try {
        const { data: response } = await axios.post(`${axios.defaults.baseURL}/auth/login`, data);

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export default withdraw;
