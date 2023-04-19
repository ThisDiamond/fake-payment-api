import { PrismaClient } from "@prisma/client"
import crypto from 'crypto'

const prisma = new PrismaClient()

const apiToken = crypto.randomBytes(16).toString('hex');
const secretKey = crypto.randomBytes(32).toString('hex')

export async function createProject(project_name: string, id_user: number) {
    return await prisma.projects.create({
        data: {
            name: project_name,
            status: 'Active',
            id_user: id_user,
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
export async function getProjectbyId(project_id: number) {
    return await prisma.projects.findMany({
        where: {
            id: project_id
        }
    })
}

export async function getTransactionbyProjectId(project_id: number) {
    return await prisma.transactions.findMany({
        where: {
            project_id: project_id
        }
    })
}


export async function generateApiKey(id_project: number, id_user: number) {
    return await prisma.apiToken.create({
        data: {
            apiToken: apiToken,
            secretKey: secretKey,
            status: 'Active',
            id_project: id_project,
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