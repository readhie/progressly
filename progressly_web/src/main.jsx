import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Journal from './components/Journal';
import Skills from './components/Skills';
import Privacy from './components/Privacy';
import './index.css';

const defaultPrivacy = {
  defaultVisibility: 'public',
  profileVisibility: 'public',
  showStreak: true,
  searchable: true
};

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [journal, setJournal] = useState([]);
  const [skills, setSkills] = useState([]);
  const [privacy, setPrivacy] = useState(defaultPrivacy);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!user) return;
    const key = user.email.replace(/[^a-z0-9]/gi, '_');
    const saved = localStorage.getItem(`progressly_${key}`);

    if (saved) {
      const data = JSON.parse(saved);
      setJournal(data.journal || []);
      setSkills(data.skills || []);
      setPrivacy(data.privacy || defaultPrivacy);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!user) return;
    const key = user.email.replace(/[^a-z0-9]/gi, '_');
    localStorage.setItem(`progressly_${key}`, JSON.stringify({ journal, skills, privacy }));
  }, [journal, skills, privacy, user]);

  function handleLogin(userData) {
    setUser(userData);
    setActiveTab('dashboard');
  }

  function addJournal(entry) {
    setJournal([entry, ...journal]);
    setUser({ ...user, streakDays: (user.streakDays || 0) + 1 });
  }

  function deleteJournal(id) {
    setJournal(journal.filter(entry => entry.id !== id));
  }

  function addSkill(skill) {
    setSkills([...skills, skill]);
  }

  function deleteSkill(id) {
    setSkills(skills.filter(skill => skill.id !== id));
  }

  function updateUser(data) {
    setUser(data);
  }

  function logout() {
    setUser(null);
    setActiveTab('dashboard');
  }

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={logout}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />

      <main className="container">
        {activeTab === 'dashboard' && (
          <Dashboard
            user={user}
            journal={journal}
            skills={skills}
            privacySettings={privacy}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'profile' && (
          <Profile
            user={user}
            onUpdateUser={updateUser}
            journal={journal}
            skills={skills}
            privacySettings={privacy}
          />
        )}
        {activeTab === 'journal' && (
          <Journal
            journal={journal}
            onAddEntry={addJournal}
            onDeleteEntry={deleteJournal}
            defaultPrivacy={privacy.defaultVisibility}
          />
        )}
        {activeTab === 'skills' && (
          <Skills skills={skills} onAddSkill={addSkill} onDeleteSkill={deleteSkill} />
        )}
        {activeTab === 'privacy' && (
          <Privacy privacySettings={privacy} onUpdatePrivacy={setPrivacy} />
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
