package games.colonier.service;

import games.colonier.entity.User;
import games.colonier.entity.UserDto;

import java.util.List;

public interface UserService {

    User save(UserDto user);
    List<User> findAll();
    void delete(long id);
    User findOne(String username);

    User findById(Long id);
}
