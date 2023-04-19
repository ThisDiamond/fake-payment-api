import { Request, Response, NextFunction } from "express";
import { generateApiKey } from "../../services/project.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        generateApiKey(1, Number(res.locals.id_user))
        res.redirect('/users/personal/apitoken')
    } catch (error) {
        console.log(error);
    }
}