package com.revature.models.DTOs;

import com.revature.models.Role;

public class OutgoingUserDTO {

    private int userId;

    private String firstName;

    private String lastName;

    private String username;

    private Role role;

    public OutgoingUserDTO() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public OutgoingUserDTO(int userId, String firstName, String lastName, String username, Role role) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName
                + ", username=" + username + ", role=" + role + "]";
    }

}
