package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.ReimbursementDAO;
import com.revature.DAOs.ReimbursementStatusDAO;
import com.revature.DAOs.UserDAO;
import com.revature.models.Reimbursement;
import com.revature.models.ReimbursementStatus;
import com.revature.models.User;
import com.revature.models.DTOs.IncomingReimbursementDTO;

@Service
public class ReimbursementService {

    private ReimbursementDAO reimbursementDAO;
    private ReimbursementStatusDAO reimbursementStatusDAO;
    private UserDAO userDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO reimbursementDAO, ReimbursementStatusDAO reimbursementStatusDAO, UserDAO userDAO) {
        this.reimbursementDAO = reimbursementDAO;
        this.reimbursementStatusDAO = reimbursementStatusDAO;
        this.userDAO = userDAO;
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementDAO.findAll();
    }

    public Reimbursement getReimbursementById(int id) {
        return reimbursementDAO.findById(id).isPresent() ? reimbursementDAO.findById(id).get() : null;
    }

    public Reimbursement addReimbursement(IncomingReimbursementDTO incomingUser) {
        Reimbursement reimbursement = new Reimbursement(incomingUser);
        Optional<ReimbursementStatus> status = reimbursementStatusDAO.findById(incomingUser.getStatusId());
        Optional<User> user = userDAO.findById(incomingUser.getUserId());

        if (status.isPresent() && user.isPresent()) {
            reimbursement.setStatusId(status.get());
            reimbursement.setUserId(user.get());
            return reimbursementDAO.save(reimbursement);
        } else {
            return null;
        }
    }

    public Reimbursement updateReimbursement(int id, IncomingReimbursementDTO incomingReimbursement) {
        if (!reimbursementDAO.findById(id).isPresent()) {
            return null;
        }
        Reimbursement reimbursement = new Reimbursement(incomingReimbursement);
        Optional<ReimbursementStatus> status = reimbursementStatusDAO.findById(incomingReimbursement.getStatusId());
        Optional<User> user = userDAO.findById(incomingReimbursement.getUserId());

        if (status.isPresent() && user.isPresent()) {
            reimbursement.setStatusId(status.get());
            reimbursement.setUserId(user.get());
            return reimbursementDAO.save(reimbursement);
        } else {
            return null;
        }
    }

    public boolean deleteReimbursement(int id) {
        if (!reimbursementDAO.findById(id).isPresent()) {
            return false;
        }
        reimbursementDAO.deleteById(id);
        return true;
    }

}
