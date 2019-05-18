package games.colonier.controller;

import com.fasterxml.jackson.core.JsonEncoding;
import games.colonier.entity.User;
import games.colonier.entity.UserDto;
import games.colonier.model.AuthToken;
import games.colonier.repository.UserRepository;
import games.colonier.security.TokenProvider;
import games.colonier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService userService;

   /* @Autowired
    private UserRepository userRepository;*/

    @Autowired
    private TokenProvider jwtTokenUtil;

  /*  @Autowired
    private BCryptPasswordEncoder bcryptEncoder;*/

    /*@PutMapping(path="/modify/{id}")
    @PreAuthorize("hasRole('BASIC')")
    public ResponseEntity<User> modifyUser (@RequestBody User user, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(record -> {
                    record.setUsername(user.getUsername());
                    record.setEmail(user.getEmail());
                    record.setPassword(bcryptEncoder.encode(user.getPassword()));
                    record.setRole(user.getRole());
                    User updated = userRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());

    }

    @GetMapping(path="/list")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping(path="/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User>  getUser(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.findById(id));
    }*/

    @GetMapping(path = "users/me")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        //Left the Bearer from the beginning of the token
        token = token.split(" ")[1];
        User user = userService.findOne(jwtTokenUtil.getUsernameFromToken(token));
        return ResponseEntity.ok(user);
    }

   /* @DeleteMapping(path = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(record -> {
                    userRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }*/



}
