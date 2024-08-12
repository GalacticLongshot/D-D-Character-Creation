import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import CharacterForm from './components/CharacterForm';
import Layout from './components/Layout';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(''); // Define email state
  const [password, setPassword] = useState(''); // Define password state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Ensure user state is cleared
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>D&D Character Creator</h1>
        </header>
        <div className="main-container">
          {user ? (
            <Routes>
              <Route path="/" element={<Layout user={user} handleSignOut={handleSignOut} />}>
                <Route index element={
                  <div>
                    <CharacterForm />
                    <CharacterList />
                  </div>
                } />
                <Route path="character-details/:id" element={<CharacterDetails />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email} // Link to email state
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password} // Link to password state
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                  />
                  <button onClick={handleSignUp}>Sign Up</button> {/* Link to handleSignUp */}
                  <button onClick={handleSignIn}>Sign In</button> {/* Link to handleSignIn */}
                </div>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
