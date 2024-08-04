package com.revature.DAOs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.ReimbursementStatus;

@Repository
public interface ReimbursementStatusDAO extends JpaRepository<ReimbursementStatus, Integer>{

    public ReimbursementStatus findByStatus(String status);

}
