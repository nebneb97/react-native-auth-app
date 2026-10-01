import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys used in AsyncStorage
const USERS_KEY = '@auth_users';        // acts as a mock "database" of registered users
const SESSION_KEY = '@auth_current_user'; // the currently logged-in user

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // logged-in user's info
  const [loading, setLoading] = useState(true); // true while restoring a saved session

  // On app start, restore the saved session (persistent login)
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(SESSION_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to restore session', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getUsers = async () => {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  // Create a new account. Throws an Error with a readable message on failure.
  const signup = async (name, email, password) => {
    const users = await getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = { name: name.trim(), email: normalizedEmail, password };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    // Log the new user in straight away (password is never kept in session state)
    const sessionUser = { name: newUser.name, email: newUser.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  // Log in with existing credentials. Throws on incorrect credentials.
  const login = async (email, password) => {
    const users = await getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const found = users.find(
      (u) => u.email === normalizedEmail && u.password === password
    );

    if (!found) {
      throw new Error('Incorrect email or password.');
    }

    const sessionUser = { name: found.name, email: found.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook so screens can call useAuth() instead of useContext(AuthContext)
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
