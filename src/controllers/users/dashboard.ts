import { Request, Response, NextFunction } from "express";
import { getProjectbyUserId } from "../../services/project.service";
import moment from 'moment'
import { PrismaClient } from "@prisma/client"
import { getUserbyUserId } from "../../services/users.service";
import { getWalletbyUserId } from "../../services/pay.service";
const prisma = new PrismaClient()

export default async (req: Request, res: Response, next: NextFunction) => {
    const project = await getProjectbyUserId(Number(res.locals.id_user))
    const alltransactions = await prisma.transactions.findMany()

    const user = await getUserbyUserId(Number(res.locals.id_user))
    const wallet = await getWalletbyUserId(Number(res.locals.id_user))

    const userData = [user]
    const walletData = [wallet]


    res.render("users/personal/dashboard", {
        title: 'Projects',
        project,
        alltransactions: alltransactions.map((transaction, index) => ({
            id: index + 1,
            date: moment(transaction.date).format('DD.MM.YYYY'),
            transfer: transaction.transfer,
            send_card: transaction.send_card,
            accept_card: transaction.accept_card,
            pay_url: transaction.pay_url,
            status: transaction.status,
            project_id: transaction.project_id,
            id_user: transaction.id_user,
        })),
        userName: res.locals.user_name,
        amount: res.locals.amount,
        userData,
        walletData,
        usermode: true
    })

};







