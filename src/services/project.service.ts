import { PrismaClient } from "@prisma/client"
import crypto from 'crypto'

const prisma = new PrismaClient()

const apiToken = crypto.randomBytes(16).toString('hex');
const secretKey = crypto.randomBytes(32).toString('hex')

export async function createProject(project_name: string, id_user: number) {
    return await prisma.projects.create({
        data: {
            id_user: id_user,
            name: project_name,
            status: 'Active'
        }
    })
}

export async function getProjectbyUserId(id_user: number) {
    return await prisma.projects.findMany({
        where: {
            id_user: id_user
        }
    })
}

export async function generateApiKey(id_user: number) {
    return await prisma.apiToken.create({
        data: {
            apiToken: apiToken,
            secretKey: secretKey,
            status: 'Active',
            id_user: id_user
        }
    })
}

export async function getApiTokensbyUserId(id_user: number) {
    return await prisma.apiToken.findMany({
        where: {
            id_user: id_user
        }
    })
}