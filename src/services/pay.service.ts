import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export function addWallet(id_user: number) {
    const amount: number = 1000000;
    const address: number = 7777707000000000 + Math.floor(Math.random() * 89999999) + 10000000;
    const code: number = Math.floor(Math.random() * 8999) + 1000;

    return prisma.wallet.create({
        data: {
            amount,
            address,
            code,
            currency: 'uzs',
            status: 'Created',
            id_user
        }
    })
}

export function getWalletbyUserId(id_user: number) {
    return prisma.wallet.findFirst({
        where: {
            id_user
        }
    })
}

export function getWalletbyAddress(address: number) {
    return prisma.wallet.findFirst({
        where: {
            address
        }
    })
}

export async function send(card_accept: number, transfer_sum: number, card_send: number) {
    try {
        return await prisma.$transaction([
            prisma.wallet.update({
                where: { address: BigInt(card_accept) },
                data: {
                    amount: { increment: transfer_sum }

                }
            }),
            prisma.wallet.update({
                where: { address: BigInt(card_send) },
                data: {
                    amount: { decrement: transfer_sum }

                }
            }),
        ])
    } catch (error) {
        return console.log('Transaction error');
    } finally {
        await prisma.$disconnect()
    }
}

export function saveTransaction(
    transfer_sum: number,
    card_send: number,
    card_accept: number,
    project_id: number,
    id_user: number
) {
    return prisma.transactions.create({
        data: {
            date: new Date(),
            transfer: transfer_sum,
            send_card: card_send,
            accept_card: card_accept,
            pay_url: 'test',
            status: 'Complated',
            project_id: project_id,
            id_user: id_user
        }
    })
}

export async function getTransactionbyUserId(id_user: number) {
    try {
        const transactions = await prisma.transactions.findMany({
            where: {
                OR: [
                    // { accept_id_user: id_user },
                    // { send_id_user: id_user }
                ]
            }
        })
        return transactions
    } catch (err) {
        console.error(`Error getting transactions for user ${id_user}: ${err}`)
        throw err
    }
}
