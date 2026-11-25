import React, { useState } from 'react';
import { BookOpen, PlusCircle, Lock, Users, Globe, Trash2, Calendar, X } from 'lucide-react';

function PrivacyBadge({ value }) {
  const Icon = value === 'private' ? Lock : value === 'connections' ? Users : Globe;
  return <span className={`privacy-badge privacy-${value}`}><Icon size={11} /> {value}</span>;
}

export default function Journal({ journal, onAddEntry, onDeleteEntry, defaultPrivacy }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Excited');
  const [privacy, setPrivacy] = useState(defaultPrivacy);
  const [skills, setSkills] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAddEntry({
      id: Date.now(), title, content, mood, privacy,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      date: new Date().toLocaleDateString()
    });
    setTitle(''); setContent(''); setSkills(''); setOpen(false);
  }

  return (
    <div className="page-stack">
      <div className="page-header"><div><span className="badge badge-emerald">Journal</span><h1>Progress Journal</h1><p>Write down what you learned, built or discovered.</p></div><button className="btn btn-primary" onClick={() => setOpen(true)}><PlusCircle size={18} /> New Entry</button></div>

      <div className="journal-list">
        {journal.length ? journal.map(entry => (
          <article className="glass-card journal-entry" key={entry.id}>
            <div className="entry-top"><span className="meta"><Calendar size={13} /> {entry.date}</span><div><span className="badge badge-amber">{entry.mood}</span> <PrivacyBadge value={entry.privacy} /></div><button className="icon-button" onClick={() => onDeleteEntry(entry.id)}><Trash2 size={15} /></button></div>
            <h2>{entry.title}</h2><p>{entry.content}</p>
            {entry.skills.length > 0 && <div className="tags">{entry.skills.map(skill => <span className="badge badge-muted" key={skill}>#{skill}</span>)}</div>}
          </article>
        )) : <div className="glass-card empty"><BookOpen size={32} /><h3>No journal entries yet</h3><p>Start by recording something you learned today.</p><button className="btn btn-primary" onClick={() => setOpen(true)}>Write an Entry</button></div>}
      </div>

      {open && <div className="modal-backdrop" onClick={() => setOpen(false)}><div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><h2>New Journal Entry</h2><button className="icon-button" onClick={() => setOpen(false)}><X size={17} /></button></div>
        <form onSubmit={submit}>
          <div className="form-group"><label className="form-label">Title</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">What did you learn?</label><textarea className="textarea" rows="4" value={content} onChange={e => setContent(e.target.value)} required /></div>
          <div className="grid-2"><div className="form-group"><label className="form-label">Mood</label><select className="select" value={mood} onChange={e => setMood(e.target.value)}><option>Excited</option><option>Focused</option><option>Okay</option><option>Challenged</option></select></div><div className="form-group"><label className="form-label">Privacy</label><select className="select" value={privacy} onChange={e => setPrivacy(e.target.value)}><option value="public">Public</option><option value="connections">Connections</option><option value="private">Private</option></select></div></div>
          <div className="form-group"><label className="form-label">Skills / Tags</label><input className="input" placeholder="React, JavaScript" value={skills} onChange={e => setSkills(e.target.value)} /></div>
          <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button><button className="btn btn-primary">Save Entry</button></div>
        </form>
      </div></div>}
    </div>
  );
}
