import React from "react";
import ReimbursementStatusesProvider from "./ReimbursementStatusContext";
import ReimbursementsProvider from "./ReimbursementContext";
import UsersProvider from "./UserContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UsersProvider>
      <ReimbursementStatusesProvider>
        <ReimbursementsProvider>{children}</ReimbursementsProvider>
      </ReimbursementStatusesProvider>
    </UsersProvider>
  );
};

export default ContextProvider;
