import React, { useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { RoleInterface } from "../../interfaces/RoleInterface";
import toast from "react-hot-toast";
import { Form, Row, Col, Button } from "react-bootstrap";
import { RolesContext } from "../../contexts/RolesContext";

type Props = {};

const AddUpdateRoles = (props: Props) => {
  // Get the id from the URL
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();

  // Get the global state from the context for roles
  const {
    roles,
    setRoles,
    fetchRoles,
  } = useContext(RolesContext);

  // Current form state
  const [role, setRole] = React.useState<any>({
    roleName: ""
  });

  useEffect(() => {
    patchValues();
  }, []);

  const navigate = useNavigate();

  const patchValues = () => {
    if (id) {
      const curRole = roles.find((r) => r.roleId === +id);
      if (curRole) {
        setRole({
          ...curRole,
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
    setRole((prevRole: any) => ({
      ...prevRole,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqRole = {
      roleName: role.roleName
    };

    if (id) {
      const response = await fetch(
        `http://localhost:8080/roles/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(reqRole),
        }
      )
        .then((response) => response.json())
        .then((json: RoleInterface) => {
          const index = roles.findIndex(
            (r) => r.roleId === +id
          );
          if (index !== -1) {
            const updatedReimbursements = [
              ...roles.slice(0, index),
              json,
              ...roles.slice(index + 1),
            ];
            setRoles(updatedReimbursements);
          }
          toast.success(`Role ${json.roleName} updated successfully`);
          navigate("/roles");
        })
        .catch((error) => {
          toast.error(`Error updating role ${role.roleName}`);
          console.log(error);
        });
    } else {
      const response = await fetch("http://localhost:8080/roles", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(reqRole),
      })
        .then((response) => response.json())
        .then((json: RoleInterface) => {
          setRoles([json, ...roles]);
          toast.success(`Role ${json.roleName} added successfully`);
          navigate("/roles");
        })
        .catch((error) => {
          console.log(error);
          toast.error(`Error adding reimbursement + ${role.roleName}`);
        });
    }
  };

  return <div>
  <Row className="justify-content-md-center w-100">
    <Col md={6}>
      <div className="p-5 border rounded shadow-sm bg-white">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="roleName">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role"
              defaultValue={role?.roleName}
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

export default AddUpdateRoles;
