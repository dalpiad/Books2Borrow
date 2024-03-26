package org.launchcode.books2borrow.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/hello")
    public String sayHello(){
        return "HELLO secure WORLD!";
    }
}
