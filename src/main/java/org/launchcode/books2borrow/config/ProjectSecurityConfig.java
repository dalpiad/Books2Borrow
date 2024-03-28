package org.launchcode.books2borrow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

    @Configuration
    public class ProjectSecurityConfig {

        @Bean
        SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

            //custom security configuration for authenticating and whitelisting routes
            http.authorizeHttpRequests((requests) -> requests
                            .requestMatchers("/testing").authenticated()
                            .requestMatchers("/hello").permitAll())
                    .formLogin(Customizer.withDefaults())
                    .httpBasic(Customizer.withDefaults());
            return http.build();
        }
    }

