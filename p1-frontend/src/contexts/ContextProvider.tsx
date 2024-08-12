import React from "react";
import ReimbursementStatusesProvider from "./ReimbursementStatusContext";
import ReimbursementsProvider from "./ReimbursementContext";
import UsersProvider from "./UserContext";
import RolesProvider from "./RolesContext";
import AuthProvider from "./AuthContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <RolesProvider>
        <UsersProvider>
          <ReimbursementStatusesProvider>
            <ReimbursementsProvider>{children}</ReimbursementsProvider>
          </ReimbursementStatusesProvider>
        </UsersProvider>
      </RolesProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
