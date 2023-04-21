import { Request, Response, NextFunction } from "express";
import { getAllApiTokenbyIdProjectAndIdUser } from "../../services/apiToken.service";
import { getAllProjectbyIdUser, getOneProjectbyName } from "../../services/project.service";



export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let params: string = req.params.project
        if (params == undefined) { params = '' }

        const id_user: number = Number(res.locals.id_user)

        const projects = await getAllProjectbyIdUser(id_user)
        const project = await getOneProjectbyName(String(params))

        let project_id = project?.id

        if (project_id == undefined) {
            project_id = 0
        }

        let apiTokens = await getAllApiTokenbyIdProjectAndIdUser(project_id, id_user)


        res.render("users/personal/apitoken", {
            title: 'API token',
            params,
            projects,
            project_id,
            apiTokens: apiTokens.map((apiTokens, index) => ({
                id: index + 1,
                apiToken: apiTokens.apiToken,
                secretKey: apiTokens.secretKey,
                status: apiTokens.status,
                id_project: apiTokens.id_project,
                id_user: apiTokens.id_user
            })),
            userName: res.locals.user_name,
            amount: res.locals.amount,
            usermode: true,
            xatolik: req.flash('apitokencheck')
        })
    } catch (error) {
        console.log(error);
    }
};