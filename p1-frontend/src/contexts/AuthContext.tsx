import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";

export interface AuthContextInterface {
    user: UserInterface;
    setUser: Dispatch<SetStateAction<UserInterface>>;
    fetchUser: () => Promise<void>;
}

const defaultState = {
    user: {
        id: 0,
        username: "",
        email: "",
        password: "",
        role: "",
    },
    setUser: () => {},
    fetchUser: async () => {}
} as AuthContextInterface;

export const AuthContext = createContext(defaultState);

type AuthProviderProps = {
    children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserInterface>({})

    const fetchUser = async () => {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            body: JSON.stringify({username: user.username, password: user.password}),
        });
        const data = await response.json();
        setUser(data);
    }

    return (
        <AuthContext.Provider value={defaultState}>
            {children}
        </AuthContext.Provider>
    );
}