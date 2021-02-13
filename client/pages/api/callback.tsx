import { NextApiRequest, NextApiResponse } from 'next';

import auth0 from '../../lib/InitAuth0';

export default async function callback(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await auth0.handleCallback(req, res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}
