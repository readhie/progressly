import React from 'react';
import { useState } from 'react';
import { GraduationCap, MapPin, Mail, Edit3, Flame, BookOpen, Code2, X } from 'lucide-react';

export default function Profile({ user, onUpdateUser, journal, skills }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, role: user.role, bio: user.bio, college: user.college, location: user.location });

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function save(e) {
    e.preventDefault();
    onUpdateUser({ ...user, ...form });
    setEditing(false);
  }

  return <div className="page-stack">
    <div className="profile-top glass-card">
      <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
      <div className="profile-main">
        <span className="badge badge-emerald">Profile</span>
        <h1>{user.name}</h1>
        <p>{user.role}</p>
        <div className="profile-meta">
          {user.college && <span><GraduationCap size={15} /> {user.college}</span>}
          {user.location && <span><MapPin size={15} /> {user.location}</span>}
          <span><Mail size={15} /> {user.email}</span>
        </div>
      </div>
      <button className="btn btn-secondary" onClick={() => setEditing(true)}>
        <Edit3 size={16} /> Edit Profile
      </button>
    </div>

    <div className="grid-2">
      <section className="glass-card">
        <h3>About</h3>
        <p className="about">{user.bio || 'Add a short bio about yourself and what you are learning.'}</p>
      </section>

      <section className="glass-card">
        <h3>Progress</h3>
        <div className="profile-stats">
          <div><Flame size={18} /><strong>{user.streakDays || 1}</strong><span>Day streak</span></div>
          <div><BookOpen size={18} /><strong>{journal.length}</strong><span>Journal entries</span></div>
          <div><Code2 size={18} /><strong>{skills.length}</strong><span>Skills</span></div>
        </div>
      </section>
    </div>

    <section className="glass-card">
      <h3>Skills</h3>
      <div className="tags">
        {skills.length ? skills.map(skill => (
          <span className="badge badge-muted" key={skill.id}>{skill.name}</span>
        )) : <span className="muted">No skills added yet.</span>}
      </div>
    </section>

    {editing && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-head">
            <h2>Edit Profile</h2>
            <button className="icon-button" onClick={() => setEditing(false)}>
              <X size={17} />
            </button>
          </div>

          <form onSubmit={save}>
            {['name', 'role', 'college', 'location'].map(field => (
              <div className="form-group" key={field}>
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input className="input" name={field} value={form[field]} onChange={change} />
              </div>
            ))}

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="textarea" name="bio" rows="3" value={form.bio} onChange={change} />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>;
}
