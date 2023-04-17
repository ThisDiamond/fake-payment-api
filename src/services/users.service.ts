import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export function findUserByEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email
        }
    })
}

export function createUser(firstname: string, lastname: string, email: string, password: string,) {
    return prisma.users.create({
        data: {
            firstname,
            lastname,
            email,
            password,
            user_type: 'user'
        }
    })
}
