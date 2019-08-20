package ie.cct.dateformatter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("ie.cct")
public class DateFormatterApplication {

	public static void main(String[] args) {
		SpringApplication.run(DateFormatterApplication.class, args);
	}

}
