package com.yourdomain.rythemics.controller;

import com.yourdomain.rythemics.model.Register;
import com.yourdomain.rythemics.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "*")
public class RegisterController {
    @Autowired
    private RegisterService registerService;

    @GetMapping
    public List<Register> getAll() {
        return registerService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Register> getById(@PathVariable Long id) {
        return registerService.getById(id);
    }

    @PostMapping
    public Register create(@RequestBody Register register) {
        return registerService.create(register);
    }

    @PutMapping("/{id}")
    public Register update(@PathVariable Long id, @RequestBody Register register) {
        return registerService.update(id, register);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        registerService.delete(id);
    }
} 