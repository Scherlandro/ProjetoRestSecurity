package biontec.biontec.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BiontecApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BiontecApiApplication.class, args);

		//System.out.print(new BCryptPasswordEncoder().encode("329"));
	}

}
