import axios from 'axios';

interface Params {
    username: string;
    auth: string;
    password: string;
}

export default async function (params: Params) {
    const { username, auth, password } = params;

    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/admin/password/change`,
            { username, password },
            { headers: { auth } },
        );
        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
