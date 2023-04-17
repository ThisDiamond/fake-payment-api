import { Request, Response, NextFunction } from "express";
import { number } from "joi";
import { createProject } from "../../services/project.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        createProject(req.body.name, Number(res.locals.id_user))
        res.redirect('/users/personal/dashboard')
    } catch (error) {
        console.log(error);
    }
}