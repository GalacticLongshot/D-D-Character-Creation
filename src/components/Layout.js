import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout({ user }) {
  return (
    <div className="auth-container">
      <header className="layout-header">
        <p>Welcome, {user.email}</p>
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
