import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ReimbursementStatusesContext } from "../../contexts/ReimbursementStatusContext";
import { ReimbursementStatusInterface } from "../../interfaces/ReimbursementStatusInterface";
import toast from "react-hot-toast";
import { Form, Row, Col, Button } from "react-bootstrap";

type Props = {};

const AddUpdateReimbursementStatuses = (props: Props) => {
  // Get the id from the URL
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  // Get the global state from the context for statuses
  const {
    reimbursementStatuses,
    setReimbursementStatuses,
    fetchReimbursementStatuses,
  } = useContext(ReimbursementStatusesContext);

  // Current form state
  const [status, setStatus] = React.useState<any>({
    status: ""
  });

  useEffect(() => {
    patchValues();
  }, []);

  const navigate = useNavigate();

  const patchValues = () => {
    if (id) {
      const curStatus = reimbursementStatuses.find((r) => r.statusId === +id);
      if (curStatus) {
        setStatus({
          ...curStatus,
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
    setStatus((prevStatus: any) => ({
      ...prevStatus,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqStatus = {
      status: status.status
    };

    if (id) {
      const response = await fetch(
        `http://localhost:8080/reimbursement-status/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(reqStatus),
        }
      )
        .then((response) => response.json())
        .then((json: ReimbursementStatusInterface) => {
          const index = reimbursementStatuses.findIndex(
            (r) => r.statusId === +id
          );
          if (index !== -1) {
            const updatedReimbursements = [
              ...reimbursementStatuses.slice(0, index),
              json,
              ...reimbursementStatuses.slice(index + 1),
            ];
            setReimbursementStatuses(updatedReimbursements);
          }
          toast.success(`Status ${json.status} updated successfully`);
          navigate("/reimbursement-statuses");
        })
        .catch((error) => {
          toast.error(`Error updating status ${status.status}`);
          console.log(error);
        });
    } else {
      const response = await fetch("http://localhost:8080/reimbursement-status", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqStatus),
      })
        .then((response) => response.json())
        .then((json: ReimbursementStatusInterface) => {
          setReimbursementStatuses([json, ...reimbursementStatuses]);
          toast.success(`Status ${json.status} added successfully`);
          navigate("/reimbursement-statuses");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Error adding reimbursement + ${status.status}`);
        });
    }
  };

  return <div>
  <Row className="justify-content-md-center w-100">
    <Col md={6}>
      <div className="p-5 border rounded shadow-sm bg-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Status"
              defaultValue={status?.status}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <br></br>
          <div className="d-flex justify-content-end">
            <Button type="submit" className="btn-lg btn-primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Col>
  </Row>
</div>;
};

export default AddUpdateReimbursementStatuses;
