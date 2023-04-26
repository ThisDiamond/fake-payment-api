import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

<<<<<<< HEAD
export async function createUser(firstname: string, lastname: string, email: string, password: string,) {
    return await prisma.users.create({
        data: {
            firstname,
            lastname,
            email,
            password,
            user_type: 'user'
        }
    })
}
=======
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
export async function findUserByEmail(email: string) {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}

export async function getOneUserbyUserId(id_user: number) {
    return await prisma.users.findFirst({
        where: {
            id: id_user
        }
    })
}

<<<<<<< HEAD


export async function getOldPasswordbyIdUser(id_user: number) {
    return await prisma.users.findFirst({
        where: {
            id: id_user
        }
    })
}

export async function updatePassword(newPassword: string, id_user: number) {
    return await prisma.users.update({
        where: {
            id: id_user
        },
        data: {
            password: newPassword
        }
    })
}
=======
export async function createUser(firstname: string, lastname: string, email: string, password: string,) {
    return await prisma.users.create({
        data: {
            firstname,
            lastname,
            email,
            password,
            user_type: 'user'
        }
    })
}
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
