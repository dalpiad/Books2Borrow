package org.launchcode.books2borrow.models;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class AbstractEntity {

    private String id;

}
