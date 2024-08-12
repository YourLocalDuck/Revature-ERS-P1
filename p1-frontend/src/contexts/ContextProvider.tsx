import React from "react";
import ReimbursementStatusesProvider from "./ReimbursementStatusContext";
import ReimbursementsProvider from "./ReimbursementContext";
import UsersProvider from "./UserContext";
import RolesProvider from "./RolesContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RolesProvider>
      <UsersProvider>
        <ReimbursementStatusesProvider>
          <ReimbursementsProvider>{children}</ReimbursementsProvider>
        </ReimbursementStatusesProvider>
      </UsersProvider>
    </RolesProvider>
  );
};

export default ContextProvider;
