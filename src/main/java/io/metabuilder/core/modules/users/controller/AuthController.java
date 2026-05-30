package io.metabuilder.core.modules.users.controller;

import io.metabuilder.core.modules.users.dto.AuthRequest;
import io.metabuilder.core.modules.users.dto.AuthResponse;
import io.metabuilder.core.modules.users.dto.RegisterRequest;
import io.metabuilder.core.modules.users.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest request) {
        return authService.login(request);
    }
}
