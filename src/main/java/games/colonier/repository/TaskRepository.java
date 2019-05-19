package games.colonier.repository;

import games.colonier.entity.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
public interface TaskRepository extends CrudRepository<Task, Long> {

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Task> S save(S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Task> Iterable<S> saveAll(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteById(Long aLong);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Task entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll(Iterable<? extends Task> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
