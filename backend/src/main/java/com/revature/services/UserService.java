package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.RoleDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.Role;
import com.revature.models.User;
import com.revature.models.DTOs.IncomingUserDTO;

@Service
public class UserService {

    private UserDAO userDAO;
    private RoleDAO roleDAO;

    @Autowired
    public UserService(UserDAO userDAO, RoleDAO roleDAO) {
        this.userDAO = userDAO;
        this.roleDAO = roleDAO;
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public User getUserById(int id) {
        return userDAO.findById(id).get();
    }

    public User addUser(IncomingUserDTO incomingUser) {
        User user = new User(incomingUser);
        Optional<Role> role = roleDAO.findById(incomingUser.getRoleId());
        if (role.isPresent()) {
            user.setRole(role.get());
            return userDAO.save(user);
        } else {
            return null;
        }
    }

    public User updateUser(int id, IncomingUserDTO incomingUser) {
        User user = new User(incomingUser);
        Optional<Role> role = roleDAO.findById(incomingUser.getRoleId());
        if (role.isPresent()) {
            user.setRole(role.get());
        } else {
            return null;
        }
        user.setUserId(id);
        return userDAO.save(user);
    }

    public void deleteUser(int id) {
        userDAO.deleteById(id);
    }

    public boolean login(String username, String password) {
        return userDAO.findByUsername(username).getPassword().equals(password);
    }

}
