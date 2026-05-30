package io.metabuilder.core.modules.users.service;

import io.metabuilder.core.modules.users.dto.AuthRequest;
import io.metabuilder.core.modules.users.dto.AuthResponse;
import io.metabuilder.core.modules.users.dto.RegisterRequest;
import io.metabuilder.core.modules.users.entity.User;
import io.metabuilder.core.modules.users.entity.UserProfile;
import io.metabuilder.core.modules.users.entity.UserProvider;
import io.metabuilder.core.modules.users.enums.ProviderType;
import io.metabuilder.core.modules.users.repository.UserProfileRepository;
import io.metabuilder.core.modules.users.repository.UserProviderRepository;
import io.metabuilder.core.modules.users.repository.UserRepository;
import io.metabuilder.core.modules.users.security.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserProviderRepository userProviderRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        User user = saveUser(request);

        saveUserProfile(request, user);

        saveUserProvider(request, user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getUsername(), request.getFullName(), user.getEmail());
    }

    private User saveUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already taken!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        // user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(OffsetDateTime.now());
        user.setUpdatedAt(OffsetDateTime.now());
        user.setIsDeleted(false);

        return userRepository.save(user);
    }

    private void saveUserProfile(RegisterRequest request, User user) {
        UserProfile userProfile = UserProfile.builder()
                .user(user)
                .fullName(request.getFullName())
                .build();
        userProfileRepository.save(userProfile);
    }

    private void saveUserProvider(RegisterRequest request, User user) {
        UserProvider userProvider = UserProvider.builder()
                .password(passwordEncoder.encode(request.getPassword()))
                .user(user)
                .provider(ProviderType.LOCAL)
                .providerAccountId(user.getEmail())
                .build();

        userProviderRepository.save(userProvider);
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        UserProfile userProfile = userProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("User profile not found"));

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getId(), user.getUsername(), userProfile.getFullName(), user.getEmail());
    }
}
