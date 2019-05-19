package games.colonier.controller;

import games.colonier.entity.User;
import games.colonier.entity.UserDto;
import games.colonier.model.AuthToken;
import games.colonier.model.LoginUser;
import games.colonier.model.RegisterUser;
import games.colonier.security.TokenProvider;
import games.colonier.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginUser loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(new AuthToken(token));
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<?> signup(@RequestBody RegisterUser registerUser){
        UserDto userDto = new UserDto();
        userDto.setUsername(registerUser.getUsername());
        userDto.setPassword(registerUser.getPassword());
        userDto.setEmail(registerUser.getEmail());
        userDto.setRole(User.Roles.BASIC);
        userService.save(userDto);

        return ResponseEntity.status(201).body("Created");

    }

}

