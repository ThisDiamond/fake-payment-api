import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getOneTransactionbyId(id: number) {
    return await prisma.transactions.findFirst({
        where: {
            id: id
        }
    })
}

export async function getAllTransactionbyId(id: number) {
    return await prisma.transactions.findMany({
        where: {
            id: id
        }
    })
}
export async function getOneTransactionbyUserId(id_user: number) {
    return await prisma.transactions.findFirst({
        where: {
            id_user: id_user
        }
    })
}

export async function getAllTransactionbyUserId(id_user: number) {
    return await prisma.transactions.findMany({
        where: {
            id_user: id_user
        }
    })
}

export async function getOneTransactionbyIdProject(id_project: number) {
    return await prisma.transactions.findFirst({
        where: {
            project_id: id_project
        }
    })
}

export async function getAllTransactionbyIdProject(id_project: number) {
    return await prisma.transactions.findMany({
        where: {
            project_id: id_project
        }
    })
}

export async function getOneTransactionbyIdProjectAndIdUser(id_project: number, id_user: number) {
    return await prisma.transactions.findFirst({
        where: {
            AND: [
                { project_id: id_project },
                { id_user: id_user },
            ]
        }
    })
}

export async function getAllTransactionbyIdProjectAndIdUser(id_project: number, id_user: number) {
    return await prisma.transactions.findMany({
        where: {
            AND: [
                { project_id: id_project },
                { id_user: id_user }
            ]
        }
    })
}
