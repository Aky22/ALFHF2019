package games.colonier.repository;

import games.colonier.entity.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestResource(collectionResourceRel = "projects", path = "projects")
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Project> S save(S entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    <S extends Project> Iterable<S> saveAll(Iterable<S> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteById(Long aLong);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void delete(Project entity);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll(Iterable<? extends Project> entities);

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    void deleteAll();
}
