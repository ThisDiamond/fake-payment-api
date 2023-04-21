import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function getAllTransactionbyUserId(id_user: number) {
    return await prisma.transactions.findMany({
        where: {
            id_user: id_user
        }
    })
}

