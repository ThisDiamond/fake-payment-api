import { Request, Response, NextFunction } from "express";
import { createProject } from "../../services/project.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.name && res.locals.id_user) {
            createProject(req.body.name, Number(res.locals.id_user))
        }
        res.redirect('/users/personal/dashboard')
    } catch (error) {
        console.log(error);
    }
}