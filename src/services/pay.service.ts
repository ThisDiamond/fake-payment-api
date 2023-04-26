import { PrismaClient } from "@prisma/client"
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export function createWallet(id_user: number) {
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

<<<<<<< HEAD
export async function transfer_sender_to_receipter(card_accept: number, transfer_sum: number, card_send: number) {
=======
export async function send(card_accept: number, transfer_sum: number, card_send: number) {
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
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
            pay_url: v4(),
            status: 'Complated',
            project_id: project_id,
            id_user: id_user
        }
    })
}
