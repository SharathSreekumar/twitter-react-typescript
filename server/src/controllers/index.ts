import { NextFunction, Request, Response } from 'express';
import * as request from 'request';
import {
    generateOAuthHeader,
    getApiUrl,
    urlParams
} from '../utility/utility';

function statusHandler(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ message: 'Status Ok!' });
}

function fetchTwitterHandler(req: Request, res: Response, next: NextFunction): void {
    try {
        let params = req.query;
        const { url } = getApiUrl();
        const method = 'GET';
        const headers = generateOAuthHeader(url, method, params);

        const { authorization, param } = headers;
        params = { ...params, ...param };
        const finalURL = urlParams(url, params);


        const auth = authorization.replace(/\n/g, '');

        const apiHeaders = {
            authorization: auth,
            'content-type': 'application/json',
        }

        request({
            method,
            url: finalURL,
            headers: apiHeaders
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const info = JSON.parse(body);
<<<<<<< HEAD
                res.status(200).json({ count: info.search_metadata.count, data: info.statuses });
            } else {
                res.status(400).json({ message: JSON.stringify(error) });
=======
                res.status(200).json({ count: info.search_metadata.count, result: info.statuses });
            } else {
                res.status(400).json({ count: 0, result: [], message: JSON.stringify(error) });
>>>>>>> 82b10091074100d50169662305308fe0e4d9db2e
            }
        });
    } catch (error) {
        next(error);
<<<<<<< HEAD
        res.status(500).json({ message: 'Error in system' });
=======
        res.status(500).json({ count: 0, result: [], message: 'Error in system' });
>>>>>>> 82b10091074100d50169662305308fe0e4d9db2e
    }
}

function optionsHandler(req: Request, res: Response, next: NextFunction): void {
    try {
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ message: 'Error in system' });
    }
}

export {
    fetchTwitterHandler,
    optionsHandler,
    statusHandler,
}