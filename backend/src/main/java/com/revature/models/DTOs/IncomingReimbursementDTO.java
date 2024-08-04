package com.revature.models.DTOs;

public class IncomingReimbursementDTO {
    private String description;
    private int amount;
    private int statusId;
    private int userId;

    public IncomingReimbursementDTO() {
    }

    public IncomingReimbursementDTO(String description, int amount, int statusId, int userId) {
        this.description = description;
        this.amount = amount;
        this.statusId = statusId;
        this.userId = userId;
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

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO [description=" + description + ", amount=" + amount + ", statusId=" + statusId
                + ", userId=" + userId + "]";
    }

    
}
