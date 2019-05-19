package games.colonier.repository;

import org.springframework.data.repository.CrudRepository;

import games.colonier.entity.User;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);

    @Override
    <S extends User> S save(S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends User> Iterable<S> saveAll(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteById(Long aLong);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(User entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll(Iterable<? extends User> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
