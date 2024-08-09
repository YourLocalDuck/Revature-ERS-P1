import React, { useEffect, useState } from 'react'
import { RoleInterface } from '../../interfaces/RoleInterface';
import RolesTable from './RolesTable';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

type Props = {}

const Roles = (props: Props) => {

  const [roles, setRoles] = useState<RoleInterface[]>([]);

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    const response = await fetch("http://localhost:8080/roles");
    const data = await response.json();
    setRoles(data);
  };

  const onEdit = (role: any) => {
    console.log(role);
  };
  const onDelete = (roleId: number) => {
    console.log(roleId);
  };
  return (
    <div>
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
            <div className="p-5 border rounded shadow-sm bg-white">
                <div className="row">
                    <div className="col-sm-8">
                        <h2 className="text-start">Roles</h2>
                    </div>
                    <div className="col-sm-4 text-end">
                        <Button variant="success" className="mb-3"><FaPlus /> Add New</Button>
                    </div>
                </div>
                <RolesTable roles={roles} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default Roles