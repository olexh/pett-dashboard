import axios from 'axios';

interface Params {
    reference: string;
    token: string;
}

export default async function (params: Params) {
    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/admin/funding/${params.reference}/refund`,
            {},
            { headers: { auth: params.token } },
        );

        return response;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
