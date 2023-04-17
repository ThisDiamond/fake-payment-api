import { Request, Response, NextFunction } from "express"
import { saveTransaction, send, getWalletbyAddress } from "../../services/pay.service"

export default async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        res.redirect('/')
        return
    }
    try {
        const { card_accept, transfer_sum, card_send } = req.body
        const accept_user = await getWalletbyAddress(Number(card_accept))
        const send_user = await getWalletbyAddress(Number(card_send))

        const accept_id_user = accept_user?.id_user
        const send_id_user = send_user?.id_user

        const send_transaction =
            await send(
                Number(card_accept),
                Number(transfer_sum),
                Number(card_send)
            )

        if (send_transaction) {
            await saveTransaction(
                Number(card_accept),
                Number(transfer_sum),
                Number(card_send),
                Number(send_id_user),
                Number(accept_id_user)
            )
        }

    } catch (error) {
        console.log(error);
    }
    res.redirect('/users/personal')
}