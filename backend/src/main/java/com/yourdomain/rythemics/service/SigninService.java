package com.yourdomain.rythemics.service;

import com.yourdomain.rythemics.model.Signin;
import com.yourdomain.rythemics.repository.SigninRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SigninService {
    @Autowired
    private SigninRepository signinRepository;

    public List<Signin> getAll() {
        return signinRepository.findAll();
    }

    public Optional<Signin> getById(Long id) {
        return signinRepository.findById(id);
    }

    public Signin create(Signin signin) {
        return signinRepository.save(signin);
    }

    public Signin update(Long id, Signin signin) {
        signin.setId(id);
        return signinRepository.save(signin);
    }

    public void delete(Long id) {
        signinRepository.deleteById(id);
    }
} 