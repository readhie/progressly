import React from 'react';
import { LayoutDashboard, User, BookOpen, Code2, Shield, Sun, Moon, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onLogout, theme, onToggleTheme }) {
  const tabs = [
    ['dashboard', 'Dashboard', LayoutDashboard],
    ['profile', 'Profile', User],
    ['journal', 'Journal', BookOpen],
    ['skills', 'Skills', Code2],
    ['privacy', 'Privacy', Shield]
  ];

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="logo" onClick={() => setActiveTab('dashboard')}>Progressly</button>
        <nav>
          {tabs.map(([id, label, Icon]) => (
            <button
              key={id}
              className={`nav-link ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={onToggleTheme} title="Change theme">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <span className="nav-user">{user.name}</span>
          <button className="icon-button" onClick={onLogout} title="Logout"><LogOut size={17} /></button>
        </div>
      </div>
    </header>
  );
}
