import axios from 'axios';

interface Params {
    user: Dashboard.User;
    type: 'ban' | 'unban';
    auth: string;
}

export default async function (params: Params) {
    const { auth, user, type } = params;

    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/admin/user/${user.username}/${type}`,
            {},
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
