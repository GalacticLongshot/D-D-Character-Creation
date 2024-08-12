import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout({ user, handleSignOut }) {
  return (
    <div className="auth-container">
      <header>
        <p>Welcome, {user.email}</p>
        <button onClick={handleSignOut}>Sign Out</button>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
