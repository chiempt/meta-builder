package io.metabuilder.core.modules.users.security;

import io.metabuilder.core.modules.users.entity.User;
import io.metabuilder.core.modules.users.entity.UserProvider;
import io.metabuilder.core.modules.users.repository.UserProviderRepository;
import io.metabuilder.core.modules.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserProviderRepository userProviderRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        UserProvider userProvider = userProviderRepository.getReferenceByUser(user);

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                userProvider.getPassword(),
                new ArrayList<>() // Empty authorities for now
        );
    }
}
