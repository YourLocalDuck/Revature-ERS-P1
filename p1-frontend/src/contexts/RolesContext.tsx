import { createContext, Dispatch, SetStateAction, useState } from "react";
import { RoleInterface } from "../interfaces/RoleInterface";


export interface RolesContextInterface {
    roles: RoleInterface[];
    setRoles: Dispatch<SetStateAction<RoleInterface[]>>;
    fetchRoles: () => Promise<void>;
}

const defaultState = {
    roles: [],
    setRoles: () => {},
    fetchRoles: async () => {}
} as RolesContextInterface;

export const RolesContext = createContext(defaultState);

type RolesProviderProps = {
    children: React.ReactNode;
};

export default function RolesProvider({ children }: RolesProviderProps) {
    const [roles, setRoles] = useState<RoleInterface[]>([]);

    const fetchRoles = async () => {
        const response = await fetch("http://localhost:8080/roles");
        const data = await response.json();
        setRoles(data);
    };

    return (
        <RolesContext.Provider value={{roles, setRoles, fetchRoles}}>
            {children}
        </RolesContext.Provider>
    );
}