import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { UserInterface } from "../../interfaces/UserInterface";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';

type Props = {};

const Users = (props: Props) => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await fetch("http://localhost:8080/users");
    const data = await response.json();
    setUsers(data);
  };

  const onEdit = (user: any) => {
    console.log(user);
  };
  const onDelete = (userId: number) => {
    console.log(userId);
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
                        <Button variant="success" className="mb-3"><FaPlus /> Add New</Button>
                    </div>
                </div>
                <UsersTable users={users} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </Col>
      </Row>

  );
};

export default Users;
