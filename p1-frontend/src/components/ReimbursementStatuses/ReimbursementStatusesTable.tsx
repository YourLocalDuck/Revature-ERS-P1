import React, { useContext, useState } from "react";
import { ReimbursementStatusInterface } from "../../interfaces/ReimbursementStatusInterface";
import { Table, Button, Modal } from "react-bootstrap";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReimbursementStatusesContext } from "../../contexts/ReimbursementStatusContext";
import toast from "react-hot-toast";

type Props = {
  reimbursementStatuses: ReimbursementStatusInterface[];
};

const ReimbursementStatusesTable = (props: Props) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState({
    show: false,
    status: {} as ReimbursementStatusInterface,
  });
  const { reimbursementStatuses, setReimbursementStatuses } = useContext(
    ReimbursementStatusesContext
  );

  const handleDelete = (deletionStatus: ReimbursementStatusInterface) => {
    setDeleteModal({ ...deleteModal, show: true, status: deletionStatus });
  };

  const confirmDelete = async () => {
    setDeleteModal({ ...deleteModal, show: false });
    const response = await fetch(
      `http://localhost:8080/reimbursement-status/${deleteModal.status.statusId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          //'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      }
    );

    if (response.ok) {
      const updatedReimbursementStatuses = reimbursementStatuses.filter(
        (status) => status.statusId !== deleteModal.status.statusId
      );
      setReimbursementStatuses(updatedReimbursementStatuses);
      toast.success(
        `Status ${deleteModal.status.status} deleted successfully.`
      );
    } else {
      toast.error(`Error deleting status ${deleteModal.status.status}.`);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reimbursementStatuses.map((reimbursementStatus, index) => (
            <tr key={reimbursementStatus.statusId}>
              <td>{reimbursementStatus.statusId}</td>
              <td>{reimbursementStatus.status}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() =>
                    navigate(
                      `/reimbursement-statuses/edit/${reimbursementStatus.statusId}`
                    )
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
                      reimbursementStatus
                        ? reimbursementStatus
                        : { statusId: 0 }
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
          Are you sure you want to delete Status {deleteModal.status.status}?
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

export default ReimbursementStatusesTable;
