import { NextFunction, Request, Response } from 'express';

function testHandler(req: Request, res: Response, next: NextFunction): void {
    res.status(200).json({ message: 'Hello World!' });
}

function fetchTwitterHandler(req: Request, res: Response, next: NextFunction): void {
    try {
        // const { id, brand, region } = req.params;

        res.status(200).json({});  // MOCK DATA call
    } catch (error) {
        next(error);
        res.status(500).json({});
      }
}

export {
    fetchTwitterHandler,
}