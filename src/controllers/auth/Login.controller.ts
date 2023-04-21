import { Request, Response, NextFunction } from "express";
import { generateJWTToken } from "../../services/token.service";
import { findUserByEmail } from "../../services/users.service";
import { schemaLogin, LoginJoi } from "../../validation/user.validation";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    // Joi validation
    const { error, value } = schemaLogin.validate(req.body) as { error: Error | undefined, value: LoginJoi };

    // check error
    if (!value || error) {
      req.flash("error", `${error}`),
        res.redirect("/login");
      return;
    }

    // get passed validation
    const { email, password } = value;

    // get user by email
    findUserByEmail(email).then((user) => {
      // check user found
      if (user == null) {
        req.flash("error", `Bunday foydalanuvchi yo'q!`),
          res.redirect("/login");
        return
      }

      // check password
      if (user.password != password) {
        req.flash("error", `Parol xato kiritildi!`),
          res.redirect("/login");
        return
      }

      // email and password passed generate new jwt token
      const token = generateJWTToken(user.email);
      res.cookie("token", token);

      // check user type

      if ((user.user_type == "user")) {
        return res.redirect("/users/personal");
      }

      if (user.user_type == "admin") {
        return res.redirect("/admin");
      }
    })
      .catch((err) => {
        console.log(err);
        res.redirect("/login");
      });

  } catch (err) {
    next(err);
  }
};
