import type { NextApiRequest, NextApiResponse } from 'next';

import MiroExportRoute from './med/miro-export';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.query.app) {
        if (req.query.app === 'miro-export')
            return MiroExportRoute(req, res);
    } else {
        return res.send('Error: don\'t know what app to use!');
    }
};