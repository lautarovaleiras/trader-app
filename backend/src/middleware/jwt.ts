import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
/**
 * middleware que chequea el token proveneinte del cliente en el header.
 * @returns chequea el token que recibe sea valido, caso contrario retorna unathorized
 */
export const checkJWT = (req: Request,  res:Response, next: NextFunction)=>{

    const token = <string>req.headers['auth'];
    let jwtPayLoad;
    try {
        jwtPayLoad= <any> jwt.verify(token,config.jwtSecret);
        res.locals.jwtPayLoad = jwtPayLoad;
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    const {userId, email} = jwtPayLoad;

    const newToken = jwt.sign({userId,email},config.jwtSecret, {expiresIn: '1h'});
    res.setHeader('token',newToken); 

    // call next
    next();

}