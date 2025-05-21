import { createContext, useContext, useEffect, useState } from "react";
import { updateUserTheme } from "../api/updateUserTheme";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [theme, setTheme] = useState();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  useEffect(() => {
    window.addEventListener('beforeunload', logout);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme)
    }

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);

    return () => {
      window.removeEventListener('beforeunload', logout);
    }
  },[theme]);

  const toggleTheme = async () => {
    if (!user) return;

    const newTheme = theme === 'light' ? 'dark' : 'light';

    try {
      await updateUserTheme(user.id, newTheme);
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);

      setUser({ ...user, theme: newTheme });
    } catch (err) {
      console.error('Failed to update theme:', err);
    }
  }

  const login = async (email, password) => {
    const res = await fetch(`http://localhost:4000/users?email=${email}`);
    const data = await res.json();

    const foundUser = data[0];
    if (!foundUser) throw new Error("User not found");
    if (foundUser.password !== password) throw new Error("Incorrect password");

    localStorage.setItem("user", JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const signup = async (email, password, name) => {
    const res = await fetch(`http://localhost:4000/users?email=${email}`);
    const data = await res.json();
    if (data.length > 0) throw new Error("Email already in use");

    const newUser = { email, password, name };
    const createRes = await fetch(`http://localhost:4000/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const created = await createRes.json();

    localStorage.setItem("user", JSON.stringify(created));
    setUser(created);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, theme, toggleTheme }}>
      {children}
    </AuthContext.Provider>
  );
}
