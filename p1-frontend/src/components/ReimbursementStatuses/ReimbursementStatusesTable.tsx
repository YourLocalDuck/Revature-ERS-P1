import React from 'react'
import { ReimbursementStatusInterface } from '../../interfaces/ReimbursementStatusInterface'
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type Props = {
    reimbursementStatuses: ReimbursementStatusInterface[]
    onEdit: (reimbursementStatus: ReimbursementStatusInterface) => void;
    onDelete: (reimbursementStatusId: number) => void;
}

const ReimbursementStatusesTable = (props: Props) => {
  return (
    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.reimbursementStatuses.map((reimbursementStatus, index) => (
                    <tr key={reimbursementStatus.statusId}>
                        <td>{reimbursementStatus.statusId}</td>
                        <td>{reimbursementStatus.status}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => props.onEdit(reimbursementStatus)} className="me-2">
                                <FaPencilAlt />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => reimbursementStatus.statusId && props.onDelete(reimbursementStatus.statusId)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
  )
}

export default ReimbursementStatusesTable