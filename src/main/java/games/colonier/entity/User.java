package games.colonier.entity;

import java.util.ArrayList;

public class User {

    public enum Roles {
        ADMIN,
        BASIC
    }

    private long id;

    private String username;

    private String email;

    private String password;

    private ArrayList<Roles> role;

    public long getId() {
        return id;
    }

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

    public ArrayList<Roles> getRole() {
        return role;
    }

    public void setRole(ArrayList<Roles> role) {
        this.role = role;
    }
}
