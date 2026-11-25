import React from 'react';
import { Flame, BookOpen, Code2, Shield, PlusCircle, ArrowRight, Calendar, Lock, Users, Globe } from 'lucide-react';

function PrivacyBadge({ value }) {
  const icons = { private: Lock, connections: Users, public: Globe };
  const Icon = icons[value] || Globe;
  return <span className={`privacy-badge privacy-${value}`}><Icon size={11} /> {value}</span>;
}

export default function Dashboard({ user, journal, skills, privacySettings, setActiveTab }) {
  const recent = journal[0];

  return (
    <div className="page-stack">
      <section className="welcome glass-card">
        <div>
          <span className="badge badge-emerald">Personal Growth</span>
          <h1>Welcome, {user.name.split(' ')[0]}!</h1>
          <p>{journal.length ? 'Keep documenting what you learn and build.' : 'Your growth journal is ready. Start documenting what you learn.'}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('journal')}><PlusCircle size={18} /> What did you learn?</button>
      </section>

      <section className="grid-4">
        <Stat icon={<Flame size={22} />} value={`${user.streakDays || 1} Days`} label="Learning Streak" />
        <Stat icon={<BookOpen size={22} />} value={`${journal.length} Logs`} label="Journal Entries" />
        <Stat icon={<Code2 size={22} />} value={`${skills.length} Skills`} label="Tracked Skills" />
        <Stat icon={<Shield size={22} />} value={privacySettings.defaultVisibility} label="Default Privacy" />
      </section>

      <section className="grid-2">
        <div className="glass-card section-card">
          <div className="section-title"><h3><BookOpen size={18} /> Recent Journal</h3>{recent && <button className="link-button" onClick={() => setActiveTab('journal')}>View all <ArrowRight size={14} /></button>}</div>
          {recent ? (
            <article>
              <div className="meta"><span><Calendar size={13} /> {recent.date}</span><PrivacyBadge value={recent.privacy} /></div>
              <h4>{recent.title}</h4>
              <p>{recent.content}</p>
              <div className="tags">{recent.skills.map(skill => <span className="badge badge-muted" key={skill}>#{skill}</span>)}</div>
            </article>
          ) : (
            <div className="empty"><BookOpen size={30} /><p>No journal reflections yet.</p><button className="btn btn-primary btn-sm" onClick={() => setActiveTab('journal')}>Write first reflection</button></div>
          )}
        </div>

        <div className="glass-card section-card">
          <div className="section-title"><h3><Code2 size={18} /> Skills in Progress</h3>{skills.length > 0 && <button className="link-button" onClick={() => setActiveTab('skills')}>Manage <ArrowRight size={14} /></button>}</div>
          {skills.length ? skills.slice(0, 4).map(skill => (
            <div className="skill-row" key={skill.id}><div><strong>{skill.name}</strong><span>{skill.level}</span></div><div className="progress"><div style={{ width: `${skill.percent}%` }} /></div></div>
          )) : <div className="empty"><Code2 size={30} /><p>Add a skill to start tracking it.</p></div>}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return <div className="glass-card stat"><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span></div></div>;
}
