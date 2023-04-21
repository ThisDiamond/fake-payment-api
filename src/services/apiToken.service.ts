import { PrismaClient } from "@prisma/client"
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function getOneApiTokenbyIdUser(id_user: number) {
    return await prisma.apiToken.findFirst({
        where: {
            id_user: id_user
        }
    })
}
export async function getAllApiTokenbyIdUser(id_user: number) {
    return await prisma.apiToken.findMany({
        where: {
            id_user: id_user
        }
    })
}

export async function getOneApiTokenbyIdProject(id_project: number) {
    return await prisma.apiToken.findFirst({
        where: {
            id_project: id_project
        }
    })
}
export async function getAllApiTokenbyIdProject(id_project: number) {
    return await prisma.apiToken.findMany({
        where: {
            id_project: id_project
        }
    })
}


export async function generateApiKey(id_project: number, id_user: number) {
    return await prisma.apiToken.create({
        data: {
            apiToken: crypto.randomBytes(16).toString('hex'),
            secretKey: crypto.randomBytes(32).toString('hex'),
            status: 'Active',
            id_project: id_project,
            id_user: id_user
        }
    })
}

