import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReimbursementStatusInterface } from "../interfaces/ReimbursementStatusInterface";

export interface ReimbursementStatusesContextInterface {
    reimbursementStatuses: ReimbursementStatusInterface[];
    setReimbursementStatuses: Dispatch<SetStateAction<ReimbursementStatusInterface[]>>;
    fetchReimbursementStatuses: () => Promise<void>;
}

const defaultState = {
    reimbursementStatuses: [],
    setReimbursementStatuses: () => {},
    fetchReimbursementStatuses: async () => {}
} as ReimbursementStatusesContextInterface;

export const ReimbursementStatusesContext = createContext(defaultState);

type ReimbursementStatusesProviderProps = {
    children: React.ReactNode;
};

export default function ReimbursementStatusesProvider({ children }: ReimbursementStatusesProviderProps) {
    const [reimbursementStatuses, setReimbursementStatuses] = useState<ReimbursementStatusInterface[]>([]);

    const fetchReimbursementStatuses = async () => {
        const response = await fetch("http://localhost:8080/reimbursement-status");
        const data = await response.json();
        setReimbursementStatuses(data);
    };

    return (
        <ReimbursementStatusesContext.Provider value={{reimbursementStatuses, setReimbursementStatuses, fetchReimbursementStatuses}}>
            {children}
        </ReimbursementStatusesContext.Provider>
    );
}