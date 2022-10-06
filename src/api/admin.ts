import axios from 'axios';

interface Params {
    user: PettDashboard.User;
    type: 'admin' | 'unadmin';
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
        console.error(e);
        throw e;
    }
}
