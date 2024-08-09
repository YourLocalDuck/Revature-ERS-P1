import React, { useEffect, useState } from "react";
import { ReimbursementStatusInterface } from "../../interfaces/ReimbursementStatusInterface";
import { Row, Col, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ReimbursementStatusesTable from "./ReimbursementStatusesTable";

type Props = {};

const ReimbursementStatuses = (props: Props) => {
  const [statuses, setStatuses] = useState<ReimbursementStatusInterface[]>([]);

  useEffect(() => {
    getAllStatuses();
  }, []);

  const getAllStatuses = async () => {
    const response = await fetch("http://localhost:8080/reimbursement-status");
    const data = await response.json();
    setStatuses(data);
  };

  const onEdit = (status: any) => {
    console.log(status);
  };
  const onDelete = (statusId: number) => {
    console.log(statusId);
  };
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
                      <Button variant="success" className="mb-3"><FaPlus /> Add New</Button>
                  </div>
              </div>
              <ReimbursementStatusesTable reimbursementStatuses={statuses} onEdit={onEdit} onDelete={onDelete} />
          </div>
      </Col>
    </Row>
  </div>
  );
};

export default ReimbursementStatuses;
