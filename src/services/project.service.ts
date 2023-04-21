import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createProject(project_name: string, id_user: number) {
    return await prisma.projects.create({
        data: {
            name: project_name,
            status: 'Active',
            id_user: id_user,
        }
    })
}

export async function deleteProjectbyId(id_project: number) {
    return await prisma.projects.delete({
        where: {
            id: id_project
        }
    })
}

export async function getOneProjectbyId(id: number) {
    return await prisma.projects.findFirst({
        where: {
            id: id
        }
    })
}

export async function getAllProjectbyId(id: number) {
    return await prisma.projects.findMany({
        where: {
            id: id
        }
    })
}

export async function getOneProjectbyIdUser(id_user: number) {
    return await prisma.projects.findFirst({
        where: {
            id_user: id_user
        }
    })
}

export async function getAllProjectbyIdUser(id_user: number) {
    return await prisma.projects.findMany({
        where: {
            id_user: id_user
        }
    })
}

export async function getOneProjectbyName(project_name: string) {
    return await prisma.projects.findFirst({
        where: {
            name: project_name
        }
    })
}

export async function getAllProjectbyName(project_name: string) {
    return await prisma.projects.findMany({
        where: {
            name: project_name
        }
    })
}

export async function getOneProjectbyNameAndIdUser(project_name: string, id_user: number) {
    return await prisma.projects.findFirst({
        where: {
            AND: [
                { name: project_name },
                { id_user: id_user }
            ]
        }
    })
}

export async function getAllProjectbyNameAndIdUser(project_name: string, id_user: number) {
    return await prisma.projects.findMany({
        where: {
            AND: [
                { name: project_name },
                { id_user: id_user }
            ]
        }
    })
}