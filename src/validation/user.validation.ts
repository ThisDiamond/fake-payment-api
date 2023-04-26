import Joi from "joi";

export interface RegJoi {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoginJoi {
    email: string;
    password: string;
}

export interface ChangePassword {
    oldpassword: string;
    newpassword: string;
    newpasswordconfirm: string;
}

export interface payCheckout {
    cardNumber: number;
    cardCode: number;
}

export const schemaRegister = Joi.object<RegJoi>({
    firstname: Joi.string()
        .required()
        .min(4)
        .max(16)
        .pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    lastname: Joi.string()
        .required()
        .min(4)
        .max(16)
        .pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    email: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[a-zA-Z0-9]{6,32}$/),
})

export const schemaLogin = Joi.object<LoginJoi>({
    email: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[a-zA-Z0-9]{6,32}$/),
});

export const schemaChangePassword = Joi.object<ChangePassword>({
    oldpassword: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[a-zA-Z0-9]{6,32}$/),
    newpassword: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[a-zA-Z0-9]{6,32}$/),
    newpasswordconfirm: Joi.string()
        .required()
        .min(6)
        .max(32)
        .regex(/^[a-zA-Z0-9]{6,32}$/),
})

export const schemaPayCheckout = Joi.object<payCheckout>({
    cardNumber: Joi.string()
        .required()
        .pattern(/^\d{16}$/),
    cardCode: Joi.number()
        .required()
        .integer()
        .min(1000)
        .max(9999)
})