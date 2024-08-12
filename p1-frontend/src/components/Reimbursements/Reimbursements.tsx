import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import ReimbursementsTable from "./ReimbursementsTable";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReimbursementsContext } from "../../contexts/ReimbursementContext";

type Props = {};

const Reimbursements = (props: Props) => {
  const navigate = useNavigate();

  const { reimbursements, setReimbursements, fetchReimbursements } = useContext(
    ReimbursementsContext
  );
  const [filteredReimbursements, setFilteredReimbursements] = useState<
    ReimbursementInterface[]
  >([]);
  const [showPending, setShowPending] = useState<boolean>(false);

  useEffect(() => {
    if (reimbursements.length === 0) {
      init();
    }
  }, []);

  useEffect(() => {
    setFilteredReimbursements(
      showPending
        ? reimbursements.filter((reimb) => reimb.statusId?.status === "PENDING")
        : reimbursements
    );
  }, [reimbursements, showPending]);

  const init = async () => {
    await fetchReimbursements()
  };

  const togglePending = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPending(e.target.checked)
    setFilteredReimbursements(
      !showPending
        ? reimbursements.filter((reimb) => reimb.statusId?.status == "PENDING")
        : reimbursements
    );
  }

  const handleNavigation =
    (path: string) => (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate(path);
    };

  return (
    <div>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <div className="p-5 border rounded shadow-sm bg-white">
            <div className="row">
              <div className="col-sm-5">
                <h2 className="text-start">Reimbursements</h2>
              </div>
              <div className="col-sm-4">
                <Form>
                  <Form.Check
                    type="switch"
                    id="pending"
                    label="Toggle Pending"
                    onChange={(e) => {
                      togglePending(e);
                    }}
                  />
                </Form>
              </div>
              <div className="col-sm-3 text-end">
                <Button
                  variant="success"
                  className="mb-3"
                  onClick={handleNavigation("/reimbursements/add")}
                >
                  <FaPlus /> Add New
                </Button>
              </div>
            </div>
            <ReimbursementsTable filteredReimbursements={filteredReimbursements} setFilteredReimbursements={setFilteredReimbursements} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Reimbursements;
