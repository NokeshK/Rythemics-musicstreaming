package com.yourdomain.rythemics.repository;

import com.yourdomain.rythemics.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterRepository extends JpaRepository<Register, Long> {
} 