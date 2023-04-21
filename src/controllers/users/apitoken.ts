import { Request, Response, NextFunction } from "express";



export default async (req: Request, res: Response, next: NextFunction) => {
    const params: string = req.params.project
    const id_user: number = +(res.locals.id_user)



    // allProject // projectApiToken //






    // const projectByName = await getProjectbyName(params)
    // const project = await getProjectbyUserId(id_user)


    // res.render("users/personal/apitoken", {
    //     title: 'API token',
    //     apiTokens,
    //     params,
    //     projectid: projectByName?.id,
    //     userName: res.locals.user_name,
    //     amount: res.locals.amount,
    //     usermode: true,
    //     xatolik: req.flash('apitokencheck')
    // })
};