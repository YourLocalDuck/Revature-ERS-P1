package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.RoleDAO;
import com.revature.models.Role;

@Service
public class RoleService {

    private RoleDAO roleDAO;

    @Autowired
    public RoleService(RoleDAO roleDAO) {
        this.roleDAO = roleDAO;
    }

    public List<Role> getAllRoles() {
        return roleDAO.findAll();
    }

    public Role getRoleById(int id) {
        return roleDAO.findById(id).get();
    }

    public Role addRole(Role role) {
        return roleDAO.save(role);
    }

    public Role updateRole(int id, Role role) {
        role.setRoleId(id);
        return roleDAO.save(role);
    }

    public void deleteRole(int id) {
        roleDAO.deleteById(id);
    }

}
