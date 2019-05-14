package games.colonier.controller;

import games.colonier.entity.Project;
import games.colonier.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping(path="/list")
    @PreAuthorize("hasRole('ADMIN')")
    public @ResponseBody Iterable<Project> getAllUsers() {
        return projectRepository.findAll();
    }

    @GetMapping(path="/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> getUser(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(path = "/create")
    public Project create(@RequestBody Project contact){
        return projectRepository.save(contact);
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<Project> update(@PathVariable("id") long id,
                                          @RequestBody Project project){
        return projectRepository.findById(id)
                .map(record -> {
                    record.setName(project.getName());
                    record.setDescription(project.getDescription());
                    Project updated = projectRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }

}
