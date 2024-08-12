import React, { useContext, useEffect, useState } from 'react'
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import ReimbursementsTable from './ReimbursementsTable';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ReimbursementsContext } from '../../contexts/ReimbursementContext';

type Props = {}

const Reimbursements = (props: Props) => {

  const navigate = useNavigate()

  const {reimbursements, setReimbursements, fetchReimbursements} = useContext(ReimbursementsContext)

  useEffect(() => {
    if (reimbursements.length === 0)
    {
      fetchReimbursements();
    }
    
  }, []);

  const handleNavigation = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
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
                        <Button variant="success" className="mb-3" onClick={handleNavigation("/reimbursements/add")}><FaPlus /> Add New</Button>
                    </div>
                </div>
                <ReimbursementsTable reimbursements={reimbursements} />
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default Reimbursements