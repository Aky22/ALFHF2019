package games.colonier.controller;

import games.colonier.entity.User;
import games.colonier.security.TokenProvider;
import games.colonier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @GetMapping(path = "users/me")
    @PreAuthorize("hasRole('BASIC')")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        //Left the Bearer from the beginning of the token
        token = token.split(" ")[1];
        User user = userService.findOne(jwtTokenUtil.getUsernameFromToken(token));
        return ResponseEntity.ok(user);
    }



}
