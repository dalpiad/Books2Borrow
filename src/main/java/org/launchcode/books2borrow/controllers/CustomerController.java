package org.launchcode.books2borrow.controllers;


import org.launchcode.books2borrow.data.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/hello")
    public String sayHello(){
        return "This should be visible without logging in with Spring Security" ;
    }

    @GetMapping("/testing")
    public String testRouteSayHello() {return "This should only be visible if Spring Security username and password works!"; }
}
