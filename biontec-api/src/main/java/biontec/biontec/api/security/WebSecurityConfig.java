package biontec.biontec.api.security;

import biontec.biontec.api.filter.AuthenticationFilter;
import biontec.biontec.api.filter.LoginFilter;
import biontec.biontec.api.services.UsuarioServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UsuarioServices userDetailsService;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
       // http.cors();
             http.csrf().disable()
              .authorizeRequests() .antMatchers(HttpMethod.POST,"/autenticar/logar").permitAll()
                     .and()
                     .authorizeRequests().antMatchers(
                     "/usuarios/criar",
                     "/usuarios/role",
                     "/usuarios/**",
                     "/paises/**").permitAll()
        .and().httpBasic()
        .and()
     .addFilterBefore(new LoginFilter("/logar",authenticationManager()),UsernamePasswordAuthenticationFilter.class)
     .addFilterBefore(new AuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
     .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

            /*
              .anyRequest().authenticated()
              .and()
             .formLogin()
              .loginPage("/")
              .permitAll()
              .and()
               .logout()
               .invalidateHttpSession(true)
               .clearAuthentication(true)
               .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
               .logoutSuccessUrl("/logout-success").permitAll() ;
          */
    }
    /*
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.GET, "/").permitAll()
        .antMatchers(HttpMethod.GET, "/usuarios")
        .hasRole("ADMIN")
        .antMatchers(HttpMethod.POST, "/usuarios")
        .hasRole("ADMIN")
        .anyRequest().authenticated()
        .and().formLogin().permitAll()
         .and()
         .logout()
         .logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
    }

    */

/*
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return provider;
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

@Bean
public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
}
*/

    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring()
       .antMatchers("/materialize/**", "/style/**");
    }
}
