import { Request, Response, NextFunction } from "express";
import { getOldPasswordbyIdUser, updatePassword } from "../../services/users.service";
import { ChangePassword, schemaChangePassword } from "../../validation/user.validation";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Joi validation
        const { error, value } = schemaChangePassword.validate(req.body) as { error: Error | undefined, value: ChangePassword };

        // check error
        if (error) {
            req.flash("msgError", `${error}`), res.redirect("/users/personal/settings");
            return;
        }

        // get old password
        const checkOldPassword = await getOldPasswordbyIdUser(Number(res.locals.id_user))

        // check old password and input password
        if (Number(checkOldPassword?.password) !== Number(value.oldpassword)) {
            req.flash("msgError", `Avvalgi parol xato!`), res.redirect("/users/personal/settings");
            return;
        }

        // check new password and confirm password
        if (value.oldpassword == value.newpasswordconfirm) {
            req.flash("msgError", `Yangi parollar mos emas`), res.redirect("/users/personal/settings");
            return;
        }

        // update password
        const checkUpdatePassword = await updatePassword(value.newpassword, Number(res.locals.id_user))

        req.flash("msgSuccess", `Parol muvaffaqqiyatli o'zgartirildi!`), res.redirect("/users/personal/settings");

    } catch (error) {
        console.log(error);
    }
};