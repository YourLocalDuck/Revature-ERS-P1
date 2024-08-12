import { createContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { ReimbursementInterface } from "../interfaces/ReimbursementInterface";

export interface ReimbursementsContextInterface {
    reimbursements: ReimbursementInterface[];
    setReimbursements: Dispatch<SetStateAction<ReimbursementInterface[]>>;
    fetchReimbursements: () => Promise<void>;
}

const defaultState = {
    reimbursements: [],
    setReimbursements: () => {},
    fetchReimbursements: async () => {}
} as ReimbursementsContextInterface;

export const ReimbursementsContext = createContext(defaultState);

type ReimbursementsProviderProps = {
    children: React.ReactNode;
};

export default function ReimbursementsProvider({ children }: ReimbursementsProviderProps) {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);

    const fetchReimbursements = async () => {
        const response = await fetch("http://localhost:8080/reimbursements", {credentials: "include"});
        const data = await response.json();
        setReimbursements(data);
    };

    return (
        <ReimbursementsContext.Provider value={{ reimbursements, setReimbursements, fetchReimbursements}}>
            {children}
        </ReimbursementsContext.Provider>
    );
}