import { Request, Response, NextFunction } from "express"
import { saveTransaction, transfer_sender_to_receipter, getWalletbyAddress } from "../../services/pay.service"

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        res.redirect('/')
        return
    }
    try {
        const { card_accept, transfer_sum, card_send } = req.body
        const accept_user = await getWalletbyAddress(Number(card_accept))
        const send_user = await getWalletbyAddress(Number(card_send))

        const project_id = 1
        const id_user = res.locals.id_user


        const send_transaction =
            await transfer_sender_to_receipter(
                Number(card_accept),
                Number(transfer_sum),
                Number(card_send)
            )

        if (send_transaction) {
            await saveTransaction(
                Number(transfer_sum),
                Number(card_send),
                Number(card_accept),
                Number(project_id),
                Number(id_user)
            )
        }

    } catch (error) {
        console.log(error);
    }
    res.redirect('/users/personal')
}