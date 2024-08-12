import React, { useContext, useEffect, useState } from 'react'
import { RoleInterface } from '../../interfaces/RoleInterface';
import RolesTable from './RolesTable';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { RolesContext } from '../../contexts/RolesContext';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Roles = (props: Props) => {

  const navigate = useNavigate()

  const {roles, setRoles, fetchRoles} = useContext(RolesContext)

  useEffect(() => {
    if (roles.length === 0)
    {
      fetchRoles();
    }
    
  }, []);

  const handleNavigation = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
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
                        <Button variant="success" className="mb-3" onClick={handleNavigation("/roles/add")}><FaPlus /> Add New</Button>
                    </div>
                </div>
                <RolesTable roles={roles} />
            </div>
        </Col>
      </Row>
    </div>
  )
}

export default Roles