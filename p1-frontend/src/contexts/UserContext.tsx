import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import React from "react";

export interface UsersContextInterface {
    users: UserInterface[];
    setUsers: Dispatch<SetStateAction<UserInterface[]>>;
    fetchUsers: () => Promise<void>;
}

const defaultState = {
    users: [],
    setUsers: () => {},
    fetchUsers: async () => {}
} as UsersContextInterface;

export const UsersContext = createContext(defaultState);

type UsersProviderProps = {
    children: React.ReactNode;
};

export default function UsersProvider({ children }: UsersProviderProps) {
    const [users, setUsers] = useState<UserInterface[]>([]);

    const fetchUsers = async () => {
        const response = await fetch("http://localhost:8080/users", {credentials: "include"});
        const data = await response.json();
        setUsers(data);
    };

    return (
        <UsersContext.Provider value={{users, setUsers, fetchUsers}}>
            {children}
        </UsersContext.Provider>
    );
}