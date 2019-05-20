package games.colonier.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import games.colonier.entity.User;
import games.colonier.security.TokenProvider;
import games.colonier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @GetMapping(path = "users/me", produces = "application/json; charset=utf-8")
    @PreAuthorize("hasRole('BASIC')")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        //Left the Bearer from the beginning of the token
        token = token.split(" ")[1];
        User user = userService.findOne(jwtTokenUtil.getUsernameFromToken(token));

        // It's necessary because if i return the user object, the jackson try to resolve all references, and return an infinite json object.
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("role", user.getRole());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }



}
