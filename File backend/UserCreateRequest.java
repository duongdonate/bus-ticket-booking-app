package com.long_bus_distance.tickets.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserCreateRequest {
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String roles;
    private UUID managedByOperatorId;
}
