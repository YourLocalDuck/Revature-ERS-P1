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

    private boolean isRoleValid(int id) {
        return roleDAO.findById(id).isPresent();
    }

    public List<Role> getAllRoles() {
        return roleDAO.findAll();
    }

    public Role getRoleById(int id) {
        return roleDAO.findById(id).isPresent() ? roleDAO.findById(id).get() : null;
    }

    public Role addRole(Role role) {
        return roleDAO.save(role);
    }

    public Role updateRole(int id, Role role) {
        role.setRoleId(id);
        if (isRoleValid(id)) {
            return roleDAO.save(role);
        } else {
            return null;
        }
    }

    public boolean deleteRole(int id) {
        if (isRoleValid(id)) {
            roleDAO.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
