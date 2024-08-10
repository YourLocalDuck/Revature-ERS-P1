import React from 'react'
import { ReimbursementInterface } from '../../interfaces/ReimbursementInterface';
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
    reimbursements: ReimbursementInterface[]
    onEdit: (reimbursement: ReimbursementInterface) => void;
    onDelete: (reimbursementId: number) => void;
}

const ReimbursementsTable = (props: Props) => {
    const navigate = useNavigate()

  return (
    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                {props.reimbursements.map((reimb, index) => (
                    <tr key={reimb.reimbursementId}>
                        <td>{reimb.reimbursementId}</td>
                        <td>{reimb.description}</td>
                        <td>{reimb.amount}</td>
                        <td>{reimb.statusId?.status}</td>
                        <td>{reimb.userId?.username}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => navigate(`/reimbursements/edit/${reimb.reimbursementId}`)} className="me-2">
                                <FaPencilAlt />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => reimb.reimbursementId && props.onDelete(reimb.reimbursementId)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
  )
}

export default ReimbursementsTable