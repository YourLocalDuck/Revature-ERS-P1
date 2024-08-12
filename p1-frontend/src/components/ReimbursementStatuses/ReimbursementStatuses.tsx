import React, { useContext, useEffect, useState } from "react";
import { ReimbursementStatusInterface } from "../../interfaces/ReimbursementStatusInterface";
import { Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ReimbursementStatusesTable from "./ReimbursementStatusesTable";
import { useNavigate } from "react-router-dom";
import { ReimbursementStatusesContext } from "../../contexts/ReimbursementStatusContext";

type Props = {};

const ReimbursementStatuses = (props: Props) => {
  const navigate = useNavigate()

  const {reimbursementStatuses, setReimbursementStatuses, fetchReimbursementStatuses} = useContext(ReimbursementStatusesContext)

  useEffect(() => {
    if (reimbursementStatuses.length === 0)
    {
      fetchReimbursementStatuses();
    }
  }, []);

  const handleNavigation = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
  }

  
  return (
  <div>
    <Row className="justify-content-md-center w-100">
      <Col md={6}>
          <div className="p-5 border rounded shadow-sm bg-white">
              <div className="row">
                  <div className="col-sm-8">
                      <h2 className="text-start">Reimbursement Statuses</h2>
                  </div>
                  <div className="col-sm-4 text-end">
                      <Button variant="success" className="mb-3" onClick={handleNavigation("/reimbursement-statuses/add")}><FaPlus /> Add New</Button>
                  </div>
              </div>
              <ReimbursementStatusesTable reimbursementStatuses={reimbursementStatuses}/>
          </div>
      </Col>
    </Row>
  </div>
  );
};

export default ReimbursementStatuses;
