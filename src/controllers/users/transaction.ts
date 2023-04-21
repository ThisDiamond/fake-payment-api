import { Request, Response, NextFunction } from "express";
import moment from "moment";
import { getAllProjectbyIdUser } from "../../services/project.service";
import { getAllTransactionbyId, getAllTransactionbyUserId } from "../../services/transaction.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    const params: string = req.params.project
    const id_user = Number(res.locals.id_user)
    const project = await getAllProjectbyIdUser(id_user)
    const alltransactions = await getAllTransactionbyUserId(id_user)

    if (params) {
        const getProject = project.find(project => project.name === params)
        const transaction = await getAllTransactionbyId(Number(getProject?.id))

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