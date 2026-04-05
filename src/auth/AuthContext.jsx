import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = [
  { email: "user@demo.com", password: "123456", role: "user", status: "none", name: "Demo User" },
  { email: "farmer@demo.com", password: "123456", role: "farmer", status: "approved", name: "Demo Farmer" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Preload demo users if db is empty
    if (!localStorage.getItem('users_db')) {
      localStorage.setItem('users_db', JSON.stringify(DEMO_USERS));
    }
    
    // Auto login
    const session = localStorage.getItem('active_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        localStorage.removeItem('active_session');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('active_session', JSON.stringify(foundUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = { name, email, password, role: 'user', status: 'none' };
    users.push(newUser);
    localStorage.setItem('users_db', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('active_session', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('active_session');
  };

  const submitFranchiseApp = (data) => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index].status = 'pending';
      users[index].application = data;
      localStorage.setItem('users_db', JSON.stringify(users));
      
      const updatedUser = { ...user, status: 'pending', application: data };
      setUser(updatedUser);
      localStorage.setItem('active_session', JSON.stringify(updatedUser));
    }
  };

  const simulateApproval = () => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index].status = 'approved';
      users[index].role = 'farmer';
      localStorage.setItem('users_db', JSON.stringify(users));
      
      const updatedUser = { ...user, status: 'approved', role: 'farmer' };
      setUser(updatedUser);
      localStorage.setItem('active_session', JSON.stringify(updatedUser));
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, submitFranchiseApp, simulateApproval }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
