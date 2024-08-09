import { ReimbursementStatusInterface } from "./ReimbursementStatusInterface"
import { UserInterface } from "./UserInterface"

export interface ReimbursementInterface {
    reimbursementId?: number
    description?: string
    amount?: number
    statusId?: ReimbursementStatusInterface
    userId?: UserInterface
}