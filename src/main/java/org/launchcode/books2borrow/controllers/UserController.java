package org.launchcode.books2borrow.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/hello")
    public String sayHello(){
        return "This should be visible without logging in with Spring Security" ;
    }

    @GetMapping("/testing")
    public String testRouteSayHello() {return "This should only be visible if Spring Security username and password works!"; }
}
