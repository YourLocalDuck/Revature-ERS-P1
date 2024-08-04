package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.DAOs.ReimbursementStatusDAO;
import com.revature.models.ReimbursementStatus;

@Service
public class ReimbursementStatusService {

    private ReimbursementStatusDAO reimbursementStatusDAO;

    @Autowired
    public ReimbursementStatusService(ReimbursementStatusDAO reimbursementStatusDAO) {
        this.reimbursementStatusDAO = reimbursementStatusDAO;
    }

    private boolean isStatusValid(int id) {
        return reimbursementStatusDAO.findById(id).isPresent();
    }

    public List<ReimbursementStatus> getAllStatuses() {
        return reimbursementStatusDAO.findAll();
    }

    public ReimbursementStatus getStatusById(int id) {
        return reimbursementStatusDAO.findById(id).isPresent() ? reimbursementStatusDAO.findById(id).get() : null;
    }

    public ReimbursementStatus getStatusByStatus(String status) {
        return reimbursementStatusDAO.findByStatus(status);
    }

    public ReimbursementStatus addStatus(ReimbursementStatus status) {
        return reimbursementStatusDAO.save(status);
    }

    public ReimbursementStatus updateStatus(int id, ReimbursementStatus status) {
        status.setStatusId(id);
        if (isStatusValid(id)) {
            return reimbursementStatusDAO.save(status);
        } else {
            return null;
        }
    }

    public boolean deleteStatus(int id) {
        if (isStatusValid(id)) {
            reimbursementStatusDAO.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

}
