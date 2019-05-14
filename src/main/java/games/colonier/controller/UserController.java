package games.colonier.controller;

import games.colonier.entity.User;
import games.colonier.entity.UserDto;
import games.colonier.repository.UserRepository;
import games.colonier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(path="/users/add")
    public @ResponseBody
    @PreAuthorize("hasRole('ADMIN')")
    String addNewUser (@RequestBody UserDto user) {
        userService.save(user);
        return "Saved";
    }

    @GetMapping(path="/users")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userService.findAll();
    }


}
