import { Request, Response, NextFunction } from "express";
import { getUserbyUserId } from "../../services/users.service";
import { getWalletbyUserId } from "../../services/pay.service";
import moment from 'moment'
import { getOneTransactionbyIdProject, getAllTransactionbyUserId } from "../../services/transaction.service";


export default async (req: Request, res: Response, next: NextFunction) => {
    const id_user = Number(res.locals.id_user)

    const project = await getOneTransactionbyIdProject(id_user)
    const alltransactions = await getAllTransactionbyUserId(id_user)

    const user = await getUserbyUserId(id_user)
    const wallet = await getWalletbyUserId(id_user)

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







