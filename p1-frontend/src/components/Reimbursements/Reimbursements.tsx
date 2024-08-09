import React, { useEffect, useState } from 'react'
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import ReimbursementsTable from './ReimbursementsTable';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

type Props = {}

const Reimbursements = (props: Props) => {

  const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);

  useEffect(() => {
    getAllReimbursements();
  }, []);

  const getAllReimbursements= async () => {
    const response = await fetch("http://localhost:8080/reimbursements");
    const data = await response.json();
    setReimbursements(data);
  };

  const onEdit = (reimbursement: any) => {
    console.log(reimbursement);
  };
  const onDelete = (reimbursementId: number) => {
    console.log(reimbursementId);
  };

  return (
    <div>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
            <div className="p-5 border rounded shadow-sm bg-white">
                <div className="row">
                    <div className="col-sm-8">
                        <h2 className="text-start">Reimbursements</h2>
                    </div>
                    <div className="col-sm-4 text-end">
                        <Button variant="success" className="mb-3"><FaPlus /> Add New</Button>
                    </div>
                </div>
                <ReimbursementsTable reimbursements={reimbursements} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default Reimbursements