package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.AuthDAO;
import com.revature.controllers.AuthController;
import com.revature.models.User;
import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;

import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    private AuthDAO authDAO;

    @Autowired
    public AuthService(AuthDAO authDAO) {
        this.authDAO = authDAO;
    }

    public OutgoingUserDTO login(LoginDTO loginDTO, HttpSession session) {
        User u = authDAO.findByUsernameAndPassword(loginDTO.getUsername(), loginDTO.getPassword());

        if (u == null) {
            return null;
        } else {
            OutgoingUserDTO outgoingUserDTO = new OutgoingUserDTO(u.getUserId(), u.getFirstName(), u.getLastName(), u.getUsername(), u.getRole());
            session.setAttribute("userId", u.getUserId());
            session.setAttribute("username", u.getUsername());
            session.setAttribute("role", u.getRole());

            return outgoingUserDTO;
        }
    }

}
