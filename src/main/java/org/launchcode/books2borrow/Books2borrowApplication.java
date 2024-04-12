package org.launchcode.books2borrow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity(debug = true)
public class Books2borrowApplication {

	public static void main(String[] args) {
		SpringApplication.run(Books2borrowApplication.class, args);
	}

}
