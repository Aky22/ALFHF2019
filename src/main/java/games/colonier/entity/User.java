package games.colonier.entity;


import javax.persistence.*;
import java.util.Set;

@Entity
public class User {

    public enum Roles {
        ADMIN,
        BASIC
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    private String username;

    private String email;

    private String password;

    private Roles role;

    @ManyToMany
    private Set<Project> projects;

    public long getId() {
        return id;
    }

    public void setId(long id) { this.id = id; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
}
