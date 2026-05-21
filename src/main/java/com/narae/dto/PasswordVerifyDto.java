package com.narae.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordVerifyDto {

    @NotBlank
    @Size(min = 4, max = 4)
    @Pattern(regexp = "\\d{4}")
    private String password;
}
