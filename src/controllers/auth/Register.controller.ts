import { Request, Response, NextFunction } from "express";
import { generateJWTToken } from "../../services/token.service";
import { createUser, findUserByEmail } from "../../services/users.service";
import { RegJoi, schemaRegister } from "../../validation/user.validation";
import { createWallet } from "../../services/pay.service";


export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Joi validation
    const { error, value } = schemaRegister.validate(req.body) as { error: Error | undefined, value: RegJoi };

    // check error
    if (error) {
      req.flash("error", `${error}`), res.redirect("/register");
      return;
    }

    // get passed validation
    const { firstname, lastname, email, password } = value;

    // search by username
    const _findUserByEmail = await findUserByEmail(email)

    // check username
    if (_findUserByEmail != null) {
      req.flash("error", `Bu email band !`);
      res.redirect("/register");
      return;
    }

    // create new user
    const _createUser = await createUser(firstname, lastname, email, password)
    await createWallet(_createUser.id)

    // JWT token
    const token = generateJWTToken(_createUser.email);
    res.cookie("token", token).redirect("/login");

    if (!_createUser) {
      req.flash("error", `Server xatoligi, qaytadan urinib koring`);
      res.redirect("/register");
    }
  } catch (err) {
    next(err);
  }
};
