import React from 'react'
import { UserInterface } from '../../interfaces/UserInterface'
import { Button, Table } from 'react-bootstrap'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

type Props = {
    users: UserInterface[]
    onEdit: (user: UserInterface) => void;
    onDelete: (userId: number) => void;
}

const UsersTable = (props: Props) => {
  return (
    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map((user, index) => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.role?.roleName}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => props.onEdit(user)} className="me-2">
                                <FaPencilAlt />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => user.userId && props.onDelete(user.userId)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
  )
}

export default UsersTable