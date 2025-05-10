package com.yourdomain.rythemics.service;

import com.yourdomain.rythemics.model.Register;
import com.yourdomain.rythemics.repository.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepository registerRepository;

    public List<Register> getAll() {
        return registerRepository.findAll();
    }

    public Optional<Register> getById(Long id) {
        return registerRepository.findById(id);
    }

    public Register create(Register register) {
        return registerRepository.save(register);
    }

    public Register update(Long id, Register register) {
        register.setId(id);
        return registerRepository.save(register);
    }

    public void delete(Long id) {
        registerRepository.deleteById(id);
    }
} 