package com.pollock.pollockhub.config;

import com.pollock.pollockhub.user.oauth2.handler.CustomLoginSuccessHandler;
import com.pollock.pollockhub.user.oauth2.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // CORS 설정
        http.cors(cors -> cors.configurationSource(request -> {
            CorsConfiguration configuration = new CorsConfiguration();

            configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://pollock.kr:5173", "http://pollock.kr", "https://pollock.kr"));
            configuration.setAllowedHeaders(Collections.singletonList("*"));
            configuration.setAllowedMethods(Collections.singletonList("*"));
            configuration.setAllowCredentials(true);

            return configuration;
        }));

        // CSRF disable
        http.csrf(AbstractHttpConfigurer::disable);

        // Form 로그인 방식 disable
        http.formLogin(AbstractHttpConfigurer::disable);

        // HTTP Basic 인증 방식 disable
        http.httpBasic(AbstractHttpConfigurer::disable);

        // OAuth2
        http.oauth2Login((oauth2) -> oauth2
                .authorizationEndpoint(authorization -> authorization
                        .baseUri("/api/pollock/users/oauth2/authorization"))
                .redirectionEndpoint(redirection -> redirection
                        .baseUri("/api/pollock/users/login/oauth2/code/*"))
                .userInfoEndpoint((userInfoEndpointConfig -> userInfoEndpointConfig
                        .userService(customOAuth2UserService)))
                .successHandler(customLoginSuccessHandler));

        // 로그아웃
        http.logout(logout -> logout
                .logoutUrl("/api/pollock/users/logout")
                .invalidateHttpSession(true)
                .deleteCookies("SESSION")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(HttpServletResponse.SC_OK)));

        // 미인증 미인가 예외처리
        http.exceptionHandling(exception -> exception
                .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED)));

        http.authorizeHttpRequests((auth) -> auth
                .requestMatchers("/api/pollock/users/**").authenticated()
                .anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/ws/**");
    }
}
