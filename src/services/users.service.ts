import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

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