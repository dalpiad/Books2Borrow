package org.launchcode.books2borrow.config;

import jakarta.servlet.DispatcherType;
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

                    .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                    .requestMatchers("/testing","/api/books/**").authenticated()
                            .requestMatchers("/hello").permitAll())
                    .formLogin(Customizer.withDefaults())
                    .httpBasic(Customizer.withDefaults())
                    .csrf((csrf) -> csrf.disable());;  //I think we should remove this line becuase my understanding is it should be enabled.
            return http.build();
        }
    }

