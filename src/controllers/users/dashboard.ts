import { Request, Response, NextFunction } from "express";
import { getProjectbyUserId } from "../../services/project.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    const project = await getProjectbyUserId(Number(res.locals.id_user))
    
    res.render("users/personal/dashboard", {
        title: 'Projects',
        project,
        userName: res.locals.user_name,
        amount: res.locals.amount,
        usermode: true
    })

};







