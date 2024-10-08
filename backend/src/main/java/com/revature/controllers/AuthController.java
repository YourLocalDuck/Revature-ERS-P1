package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.DTOs.LoginDTO;
import com.revature.models.DTOs.OutgoingUserDTO;
import com.revature.services.AuthService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth/login")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
        OutgoingUserDTO outUser = authService.login(loginDTO, session);

        if (outUser == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        return ResponseEntity.accepted().body(outUser);
    }

}
