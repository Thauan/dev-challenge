import { Request, Response, NextFunction } from 'express'

// custom middleware
export default (req: Request, res: Response, next: NextFunction) => {
    console.log(`Logs:  ${req.url}  ${req.method} -- ${new Date()}`);
    return next();
}