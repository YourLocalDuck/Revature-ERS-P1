package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.ReimbursementStatus;
import com.revature.services.ReimbursementStatusService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/reimbursement-status")
public class ReimbursementStatusController {

    private ReimbursementStatusService reimbursementStatusService;

    @Autowired
    public ReimbursementStatusController(ReimbursementStatusService reimbursementStatusService) {
        this.reimbursementStatusService = reimbursementStatusService;
    }

    @GetMapping
    public ResponseEntity<List<ReimbursementStatus>> getAllStatuses() {
        List<ReimbursementStatus> statuses = reimbursementStatusService.getAllStatuses();
        return ResponseEntity.ok(statuses);
    }

    @GetMapping("/{statusName}")
    public ResponseEntity<ReimbursementStatus> getStatusByName(@PathVariable String statusName) {
        ReimbursementStatus status = reimbursementStatusService.getStatusByStatus(statusName);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(status);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<ReimbursementStatus> getStatusById(@PathVariable int id) {
        ReimbursementStatus status = reimbursementStatusService.getStatusById(id);
        if (status == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(status);
    }

    @PostMapping
    public ResponseEntity<ReimbursementStatus> addStatus(@Valid @RequestBody ReimbursementStatus status) {
        ReimbursementStatus newStatus = reimbursementStatusService.addStatus(status);
        if (newStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(201).body(newStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReimbursementStatus> updateStatus(@PathVariable int id, @Valid @RequestBody ReimbursementStatus status) {
        ReimbursementStatus updatedStatus = reimbursementStatusService.updateStatus(id, status);
        if (updatedStatus == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.status(201).body(updatedStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatus(@PathVariable int id) {
        if(reimbursementStatusService.deleteStatus(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
