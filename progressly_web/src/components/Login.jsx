import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight } from 'lucide-react';

export default function Login({ onLogin }) {
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!email || !password || (register && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    onLogin({
      name: register ? name : email.split('@')[0],
      email: email.toLowerCase(),
      role: 'Learner & Developer',
      bio: '',
      college: '',
      location: '',
      streakDays: 1
    });
  }

  return (
    <div className="login-page">
      <div className="login-card glass-card">
        <div className="login-logo">Progressly</div>
        <p className="login-subtitle">Track your journey. Showcase your growth.</p>
        <h1>{register ? 'Create your account' : 'Welcome back'}</h1>

        <form onSubmit={submit}>
          {register && (
            <div className="form-group">
              <label className="form-label">Name</label>
              <div className="input-wrap"><User size={16} /><input className="input" value={name} onChange={e => setName(e.target.value)} /></div>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrap"><Mail size={16} /><input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrap"><Lock size={16} /><input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} /></div>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary full" type="submit">
            {register ? 'Create Account' : 'Continue'} <ArrowRight size={17} />
          </button>
        </form>

        <button className="text-button" onClick={() => { setRegister(!register); setError(''); }}>
          {register ? 'Already have an account? Log in' : 'New to Progressly? Create an account'}
        </button>
      </div>
    </div>
  );
}
