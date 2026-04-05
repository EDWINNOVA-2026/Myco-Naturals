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

  // Store franchise application in separate database
  const submitFranchiseApp = (data) => {
    if (!user) return;

    const applications = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
    const applicationData = {
      id: Date.now(),
      email: user.email,
      name: user.name,
      ...data,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      approvedAt: null
    };

    applications.push(applicationData);
    localStorage.setItem('franchise_applications', JSON.stringify(applications));

    // Update user status to pending
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
      users[index].status = 'pending';
      users[index].applicationId = applicationData.id;
      localStorage.setItem('users_db', JSON.stringify(users));

      const updatedUser = { ...user, status: 'pending', applicationId: applicationData.id };
      setUser(updatedUser);
      localStorage.setItem('active_session', JSON.stringify(updatedUser));
    }
  };

  // Admin function to get all pending applications
  const getPendingApplications = () => {
    const applications = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
    return applications.filter(app => app.status === 'pending');
  };

  // Admin function to approve an application
  const approveApplication = (applicationId) => {
    const applications = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
    const appIndex = applications.findIndex(app => app.id === applicationId);

    if (appIndex !== -1) {
      applications[appIndex].status = 'approved';
      applications[appIndex].approvedAt = new Date().toISOString();
      localStorage.setItem('franchise_applications', JSON.stringify(applications));

      // Update user to farmer role with approved status
      const users = JSON.parse(localStorage.getItem('users_db') || '[]');
      const userIndex = users.findIndex(u => u.email === applications[appIndex].email);

      if (userIndex !== -1) {
        users[userIndex].status = 'approved';
        users[userIndex].role = 'farmer';
        localStorage.setItem('users_db', JSON.stringify(users));
      }

      return { success: true };
    }
    return { success: false };
  };

  // Admin function to reject an application
  const rejectApplication = (applicationId) => {
    const applications = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
    const appIndex = applications.findIndex(app => app.id === applicationId);

    if (appIndex !== -1) {
      applications[appIndex].status = 'rejected';
      localStorage.setItem('franchise_applications', JSON.stringify(applications));

      // Update user status back to none
      const users = JSON.parse(localStorage.getItem('users_db') || '[]');
      const userIndex = users.findIndex(u => u.email === applications[appIndex].email);

      if (userIndex !== -1) {
        users[userIndex].status = 'none';
        localStorage.setItem('users_db', JSON.stringify(users));
      }

      return { success: true };
    }
    return { success: false };
  };

  // Legacy demo function - kept for backward compatibility
  const simulateApproval = () => {
    if (!user) return;
    approveApplication(user.applicationId);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, submitFranchiseApp, simulateApproval, getPendingApplications, approveApplication, rejectApplication }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
