package com.yourdomain.rythemics.controller;

import com.yourdomain.rythemics.model.Signin;
import com.yourdomain.rythemics.service.SigninService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/signin")
@CrossOrigin(origins = "*")
public class SigninController {
    @Autowired
    private SigninService signinService;

    @GetMapping
    public List<Signin> getAll() {
        return signinService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Signin> getById(@PathVariable Long id) {
        return signinService.getById(id);
    }

    @PostMapping
    public Signin create(@RequestBody Signin signin) {
        return signinService.create(signin);
    }

    @PutMapping("/{id}")
    public Signin update(@PathVariable Long id, @RequestBody Signin signin) {
        return signinService.update(id, signin);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        signinService.delete(id);
    }
} 