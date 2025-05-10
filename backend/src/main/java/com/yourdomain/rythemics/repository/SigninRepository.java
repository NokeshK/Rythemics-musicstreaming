package com.yourdomain.rythemics.repository;

import com.yourdomain.rythemics.model.Signin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SigninRepository extends JpaRepository<Signin, Long> {
} 