import { RequestHandler } from 'express';
import { ServerError } from '../../types/types';
import { ZodiacInfo } from '../models/zodiacModel';

export const zodiacQuery: RequestHandler = async (req, res, next) => {
    try{
        const sign = req.params.zodiac;
        if(!sign){
            const error: ServerError = {
                log: "invalid zodiac sign in zodiacQuery",
                status: 400,
                message: { err: "error occurs when querying zodiac info"}
            };
            return next(error);
        }
        const zodiacDatesAndTraits = await ZodiacInfo.findOne({userZodiac: sign})
        if(!zodiacDatesAndTraits){
            const error: ServerError = {
                log: "unable to find the zodiac sign in zodiacQuery",
                status: 400,
                message: { err: "error occurs when querying zodiac info"}
            };
            return next(error);
        }
        res.locals.zodiacDatesAndTraits = zodiacDatesAndTraits;
        return next()
    }catch (err){
        const error: ServerError = {
            log: `error in zodiacQuery: ${err}`,
            status: 400,
            message: { err: "error occurs when querying zodiac info"}
        };
        return next(error);
    }
}
