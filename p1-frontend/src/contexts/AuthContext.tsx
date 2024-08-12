import { createContext, Dispatch, SetStateAction, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import { RoleInterface } from "../interfaces/RoleInterface";

export interface AuthContextInterface {
  user: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface>>;
  fetchUser: () => Promise<UserInterface>;
}

const defaultState = {
  user: {
    id: 0,
    username: "",
    email: "",
    password: "",
    role: {} as RoleInterface,
  },
  setUser: () => {},
  fetchUser: async () => {
    return {
      id: 0,
      username: "",
      email: "",
      password: "",
      role: {} as RoleInterface,
    };
  },
} as AuthContextInterface;

export const AuthContext = createContext(defaultState);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserInterface>({});

  const fetchUser = async () => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((response) =>
        response.json().then((json: UserInterface) => {
          console.log(json);
          setUser(json);
          return json;
        })
      )
      .catch((error) => {
        console.log(error);
        return {} as UserInterface;
      });
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
