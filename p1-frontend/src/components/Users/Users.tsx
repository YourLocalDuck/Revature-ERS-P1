import React, { useContext, useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { UserInterface } from "../../interfaces/UserInterface";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../contexts/UserContext";

type Props = {};

const Users = (props: Props) => {
  const navigate = useNavigate()

  const {users, setUsers, fetchUsers} = useContext(UsersContext)

  useEffect(() => {
    if (users.length === 0)
    {
      fetchUsers();
    }
    
  }, []);

  const handleNavigation = (path: string) => (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(path);
  };

  return (

      <Row className="justify-content-md-center w-100">
        <Col md={6}>
            <div className="p-5 border rounded shadow-sm bg-white">
                <div className="row">
                    <div className="col-sm-8">
                        <h2 className="text-start">Users</h2>
                    </div>
                    <div className="col-sm-4 text-end">
                        <Button variant="success" className="mb-3" onClick={handleNavigation("/users/add")}><FaPlus /> Add New</Button>
                    </div>
                </div>
                <UsersTable users={users} />
            </div>
        </Col>
      </Row>

  );
};

export default Users;
