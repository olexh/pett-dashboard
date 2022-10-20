import axios from 'axios';

interface Params {
    auth: string;
    req: { txid?: string; reference: string; comment?: string };
    isRefunded: boolean;
}

export default async function (params: Params) {
    const { auth, req, isRefunded } = params;

    try {
        const { data: response } = await axios.post(
            `${axios.defaults.baseURL}/admin/withdrawal/${req.reference}/${isRefunded ? 'refund' : 'process'}`,
            req,
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
