package com.yourdomain.rythemics.repository;

import com.yourdomain.rythemics.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
} 