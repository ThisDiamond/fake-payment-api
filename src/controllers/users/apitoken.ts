import { Request, Response, NextFunction } from "express";
import { getApiTokensbyUserId } from "../../services/project.service";

export default async (req: Request, res: Response, next: NextFunction) => {
    const apiTokens = await getApiTokensbyUserId(Number(res.locals.id_user))

    res.render("users/personal/apitoken", {
        title: 'API token',
        apiTokens,
        usermode: true
    })
};