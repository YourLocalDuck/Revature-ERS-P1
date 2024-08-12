import React, { useContext, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { UserInterface } from "../../interfaces/UserInterface";
import { ReimbursementStatusInterface } from "../../interfaces/ReimbursementStatusInterface";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ReimbursementsContext } from "../../contexts/ReimbursementContext";
import { ReimbursementStatusesContext } from "../../contexts/ReimbursementStatusContext";
import { UsersContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

type Props = {};

const AddUpdateReimbursements = (props: Props) => {
  // Get the id from the URL
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  // Get the global state from the context for reimbursements, users, and statuses
  const { reimbursements, setReimbursements } = useContext(
    ReimbursementsContext
  );
  const { users, setUsers, fetchUsers } = useContext(UsersContext);
  const {
    reimbursementStatuses,
    setReimbursementStatuses,
    fetchReimbursementStatuses,
  } = useContext(ReimbursementStatusesContext);
  const { user } = useContext(AuthContext);

  // Current Reimbursement state
  const [reimb, setReimb] = React.useState<any>({
    amount: undefined,
    description: undefined,
    statusId: undefined,
    userId: undefined,
  });

  useEffect(() => {
    getUsers();
    getStatuses();
    patchValues();
  }, []);

  const navigate = useNavigate();

  const getUsers = async () => {
    if (users.length === 0) {
      fetchUsers();
    }
  };

  const getStatuses = async () => {
    if (reimbursementStatuses.length === 0) {
      fetchReimbursementStatuses();
    }
  };

  const patchValues = () => {
    if (id) {
      const curReimb = reimbursements.find((r) => r.reimbursementId === +id);
      if (curReimb) {
        setReimb({
          ...curReimb,
          statusId: curReimb.statusId?.statusId,
          userId: curReimb.userId?.userId,
        });
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = event.target;
    setReimb((prevReimb: any) => ({
      ...prevReimb,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqReimb = {
      amount: reimb.amount,
      description: reimb.description,
      statusId: user.role?.roleName === "Employee" ? reimbursementStatuses.find(r => r.status === "PENDING")?.statusId : reimb.statusId,
      userId: user.role?.roleName === "Employee" ? user.userId : reimb.userId,
    };

    if (id) {
      const response = await fetch(
        `http://localhost:8080/reimbursements/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(reqReimb),
        }
      )
        .then((response) => response.json())
        .then((json: ReimbursementInterface) => {
          const index = reimbursements.findIndex(
            (r) => r.reimbursementId === +id
          );
          if (index !== -1) {
            const updatedReimbursements = [
              ...reimbursements.slice(0, index),
              json,
              ...reimbursements.slice(index + 1),
            ];
            setReimbursements(updatedReimbursements);
          }
          toast.success(`Reimbursement ${id} updated successfully`);
          navigate("/reimbursements");
        })
        .catch((error) => {
          toast.error(`Error updating reimbursement ${id}`);
          console.log(error);
        });
    } else {
      const response = await fetch("http://localhost:8080/reimbursements", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqReimb),
      })
        .then((response) => response.json())
        .then((json: ReimbursementInterface) => {
          setReimbursements([json, ...reimbursements]);
          toast.success("Reimbursement added successfully");
          navigate("/reimbursements");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error adding reimbursement");
        });
    }
  };

  return (
    <div>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-5 border rounded shadow-sm bg-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Amount"
                  defaultValue={reimb?.amount}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  defaultValue={reimb?.description}
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
              {user?.role?.roleName !== "Employee" && (
                <>
                  <Form.Group className="mb-3" controlId="statusId">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      aria-label="status"
                      value={reimb?.statusId}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select Status</option>
                      {reimbursementStatuses.map((status) => (
                        <option key={status.statusId} value={status.statusId}>
                          {status.status}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>User</Form.Label>
                    <Form.Select
                      aria-label="user"
                      value={reimb?.userId}
                      onChange={(e) => handleChange(e)}
                    >
                      <option>Select User</option>
                      {users.map((user) => (
                        <option key={user.userId} value={user.userId}>
                          {user.username}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              <br></br>
              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  className="btn-lg btn-primary"
                  onClick={() => navigate("/reimbursements")}
                >
                  Back
                </Button>
                <Button type="submit" className="btn-lg btn-primary">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddUpdateReimbursements;
