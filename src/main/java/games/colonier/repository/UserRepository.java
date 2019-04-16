package games.colonier.repository;

import org.springframework.data.repository.CrudRepository;

import games.colonier.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
}
