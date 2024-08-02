package com.revature.DAOs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.User;

@Repository
public interface UserDAO extends JpaRepository<User, Integer>{
    public User findByUsername(String username);

}
