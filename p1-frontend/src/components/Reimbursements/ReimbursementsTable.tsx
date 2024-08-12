import React, { useContext } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { Table, Button } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReimbursementsContext } from "../../contexts/ReimbursementContext";

type Props = {
  reimbursements: ReimbursementInterface[];
};

const ReimbursementsTable = (props: Props) => {
  const navigate = useNavigate();

  const { reimbursements, setReimbursements } = useContext(
    ReimbursementsContext
  );

  const handleDelete = async (reimbursementId: number) => {
    const response = await fetch(
      `http://localhost:8080/reimbursements/${reimbursementId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
    );

    if (response.ok) {
      const updatedReimbursements = props.reimbursements.filter(
        (reimb) => reimb.reimbursementId !== reimbursementId
      );
      setReimbursements(updatedReimbursements);
    }
  };

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
              <Button
                variant="warning"
                size="sm"
                onClick={() =>
                  navigate(`/reimbursements/edit/${reimb.reimbursementId}`)
                }
                className="me-2"
              >
                <FaPencilAlt />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  handleDelete(reimb.reimbursementId ? reimb.reimbursementId : 0)
                }
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReimbursementsTable;
