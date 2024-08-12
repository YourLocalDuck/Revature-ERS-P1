import React, { useContext, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { Table, Button, Modal } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReimbursementsContext } from "../../contexts/ReimbursementContext";
import toast from "react-hot-toast";

type Props = {
  filteredReimbursements: ReimbursementInterface[];
  setFilteredReimbursements: (reimbursements: ReimbursementInterface[]) => void;
};

const ReimbursementsTable = (props: Props) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState({ show: false, id: 0 });
  const { reimbursements, setReimbursements } = useContext(
    ReimbursementsContext
  );

  const handleDelete = (reimbursementId: ReimbursementInterface) => {
    setDeleteModal({ ...deleteModal, show: true, id: reimbursementId.reimbursementId ?? 0});
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const confirmDelete = async () => {
    setDeleteModal({ ...deleteModal, show: false });
    const response = await fetch(
      `http://localhost:8080/reimbursements/${deleteModal.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
    );

    if (response.ok) {
      const updatedReimbursements = reimbursements.filter(
        (reimb) => reimb.reimbursementId !== deleteModal.id
      );
      const updatedFilteredReimbursements = props.filteredReimbursements.filter(
        (reimb) => reimb.reimbursementId !== deleteModal.id
      );
      props.setFilteredReimbursements(updatedFilteredReimbursements);
      setReimbursements(updatedReimbursements);
      toast.success(`Reimbursement id ${deleteModal.id} deleted successfully.`);
    } else {
      toast.error(`Error deleting reimbursement ${deleteModal.id}.`);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.filteredReimbursements.map((reimb, index) => (
            <tr key={reimb.reimbursementId}>
              <td>{reimb.reimbursementId}</td>
              <td>{reimb.description}</td>
              <td>{formatCurrency(reimb.amount ?? 0)}</td>
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
                    handleDelete(
                      reimb ? reimb : { reimbursementId: 0 }
                    )
                  }
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={deleteModal.show}
        onHide={() => setDeleteModal({ ...deleteModal, show: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete Reimbursement id {deleteModal.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteModal({ ...deleteModal, show: false })}
          >
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReimbursementsTable;
