import { Request, Response, NextFunction } from "express";
import { generateApiKey, getAllApiTokenbyIdProject } from "../../services/apiToken.service";
import { getOneProjectbyId } from "../../services/project.service";



export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id)

        const project = await getOneProjectbyId(id)

        const projectUrl = project?.name

        const tokens = await getAllApiTokenbyIdProject(Number(project?.id))

        if (tokens.length >= 5) {
            req.flash('apitokencheck', `Xatolik! 5 tadan ko'p token yaratib bo'lmaydi.`)
            res.redirect(`/users/personal/apitoken/${projectUrl}`)
            return
        }

        await generateApiKey(id, Number(res.locals.id_user))

        res.redirect(`/users/personal/apitoken/${projectUrl}`)
    } catch (error) {
        console.log(error);
    }
}