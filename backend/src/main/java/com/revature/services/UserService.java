package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.UserDAO;
import com.revature.models.User;

@Service
public class UserService {

    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public User getUserById(int id) {
        return userDAO.findById(id).get();
    }

    public User addUser(User user) {
        return userDAO.save(user);
    }

    public User updateUser(User user) {
        return userDAO.save(user);
    }

    public void deleteUser(int id) {
        userDAO.deleteById(id);
    }

    public boolean login(String username, String password) {
        return userDAO.findByUsername(username).getPassword().equals(password);
    }

}
