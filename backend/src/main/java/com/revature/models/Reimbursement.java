package com.revature.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.stereotype.Component;

import com.revature.models.DTOs.IncomingReimbursementDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "reimbursements")
@Component
public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reimbId")
    private int reimbursementId;

    private String description;

    @Column(nullable = false)
    @NotNull(message = "Field amount is mandatory")
    private int amount;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    @NotNull(message = "Field statusId is mandatory")
    private ReimbursementStatus statusId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @NotNull(message = "Field userId is mandatory")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User userId;

    public Reimbursement() {
    }

    public Reimbursement(int reimbursementId, String description, int amount, ReimbursementStatus statusId, User userId) {
        this.reimbursementId = reimbursementId;
        this.description = description;
        this.amount = amount;
        this.statusId = statusId;
        this.userId = userId;
    }

    public Reimbursement(IncomingReimbursementDTO reimbursement) {
        this.description = reimbursement.getDescription();
        this.amount = reimbursement.getAmount();
        this.statusId = new ReimbursementStatus(reimbursement.getStatusId(), null);
        this.userId = new User(reimbursement.getUserId(), null, null, null, null, null);
    }

    public int getReimbursementId() {
        return reimbursementId;
    }

    public void setReimbursementId(int reimbursementId) {
        this.reimbursementId = reimbursementId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public ReimbursementStatus getStatusId() {
        return statusId;
    }

    public void setStatusId(ReimbursementStatus statusId) {
        this.statusId = statusId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Reimbursement [reimbursementId=" + reimbursementId + ", description=" + description + ", amount="
                + amount + ", statusId=" + statusId + ", userId=" + userId + "]";
    }

    
}
