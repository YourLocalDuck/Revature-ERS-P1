package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Reimbursement;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import com.revature.services.ReimbursementService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class ReimbursementController {
    private ReimbursementService reimbursementService;

    @Autowired
    public ReimbursementController(ReimbursementService reimbursementService) {
        this.reimbursementService = reimbursementService;
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(HttpSession session) {
        if (session.getAttribute("role").equals("Employee"))
        {
            List<Reimbursement> reimbursements = reimbursementService.getReimbursementsByUserId((int) session.getAttribute("userId"));
            return ResponseEntity.ok(reimbursements);
        }
        List<Reimbursement> reimbursements = reimbursementService.getAllReimbursements();
        return ResponseEntity.ok(reimbursements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reimbursement> getReimbursementById(@PathVariable int id) {
        Reimbursement reimbursement = reimbursementService.getReimbursementById(id);
        if (reimbursement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reimbursement);
    }

    @PostMapping
    public ResponseEntity<Reimbursement> addReimbursement(@Valid @RequestBody IncomingReimbursementDTO incomingReimbursement) {
        Reimbursement newReimbursement = reimbursementService.addReimbursement(incomingReimbursement);
        if (newReimbursement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(201).body(newReimbursement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reimbursement> updateReimbursement(@PathVariable int id, @Valid @RequestBody IncomingReimbursementDTO incomingReimbursement) {
        Reimbursement updatedReimbursement = reimbursementService.updateReimbursement(id, incomingReimbursement);
        if (updatedReimbursement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(201).body(updatedReimbursement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Reimbursement> deleteReimbursement(@PathVariable int id) {
        if (reimbursementService.deleteReimbursement(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId) {
        List<Reimbursement> reimbursements = reimbursementService.getReimbursementsByUserId(userId);
        return ResponseEntity.ok(reimbursements);
    }

}
