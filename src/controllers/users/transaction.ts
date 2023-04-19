import { Request, Response, NextFunction } from "express";
import { getProjectbyUserId, getTransactionbyProjectId, getProjectbyId } from "../../services/project.service";
import moment from "moment";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async (req: Request, res: Response, next: NextFunction) => {
    const params: string = req.params.project
    const project = await getProjectbyUserId(Number(res.locals.id_user))
    const alltransactions = await prisma.transactions.findMany()

    if (params) {
        const getProject = project.find(project => project.name === params)
        const transaction = await getTransactionbyProjectId(Number(getProject?.id))

        return res.render("users/personal/transaction", {
            title: 'Transaction',
            project,
            transaction: transaction.map((transaction, index) => ({
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
            params,
            userName: res.locals.user_name,
            amount: res.locals.amount,
            usermode: true
        })
    }

    res.render("users/personal/transaction", {
        title: 'Transaction',
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
        project,
        userName: res.locals.user_name,
        amount: res.locals.amount,
        usermode: true
    })
};