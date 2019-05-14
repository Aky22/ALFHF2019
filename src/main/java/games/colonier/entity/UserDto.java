package games.colonier.entity;

public class UserDto {

    private String username;
    private String password;
    private String email;
    private User.Roles role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User.Roles getRole() {
        return role;
    }

    public void setRole(User.Roles role) {
        this.role = role;
    }
}
