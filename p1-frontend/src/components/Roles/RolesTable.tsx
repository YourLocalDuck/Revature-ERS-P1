import React from 'react'
import { RoleInterface } from '../../interfaces/RoleInterface';
import { Table, Button } from 'react-bootstrap';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type Props = {
    roles: RoleInterface[]
    onEdit: (role: RoleInterface) => void;
    onDelete: (roleId: number) => void;
}

const RolesTable = (props: Props) => {
  return (
    <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Role Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.roles.map((role, index) => (
                    <tr key={role.roleId}>
                        <td>{role.roleId}</td>
                        <td>{role.roleName}</td>
                        <td>
                            <Button variant="warning" size="sm" onClick={() => props.onEdit(role)} className="me-2">
                                <FaPencilAlt />
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => role.roleId && props.onDelete(role.roleId)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
  )
}

export default RolesTable