import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { generateJWTToken } from "../../services/token.service";
import { createUser, findUserByEmail } from "../../services/users.service";
import { RegJoi, schemaRegister } from "../../validation/user.validation";
import { addWallet } from "../../services/pay.service";

const prisma = new PrismaClient();

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
    findUserByEmail(email)
      .then((checkUsername) => {
        // check user
        if (checkUsername != null) {
          req.flash("error", `Bu email band!`);
          res.redirect("/register");
          return;
        }

        // Create new user
        createUser(firstname, lastname, email, password)
          .then((user) => {
            // wallet_b
            addWallet(user.id)
              .then((wallet => {
                // JWT token
                const token = generateJWTToken(user.email);
                res.cookie("token", token).redirect("/login");
              }))
              .catch(error => {
                console.log(error);
              })
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        req.flash("error", `Server xatoligi, qaytadan urinib koring`);
        res.redirect("/register");
      });
  } catch (err) {
    next(err);
  }
};
