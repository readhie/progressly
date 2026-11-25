import React, { useState } from 'react';
import { Code2, PlusCircle, Trash2, X } from 'lucide-react';

export default function Skills({ skills, onAddSkill, onDeleteSkill }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [category, setCategory] = useState('Frontend');

  const levelPercent = { Beginner: 25, Intermediate: 50, Advanced: 75, Expert: 100 };

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAddSkill({ id: Date.now(), name, level, category, percent: levelPercent[level] });
    setName(''); setOpen(false);
  }

  return (
    <div className="page-stack">
  <div className="page-header">
    <div>
      <span className="badge badge-indigo">Skills</span>
      <h1>Skills in Progress</h1>
      <p>Keep track of the skills you are learning.</p>
    </div>
    <button className="btn btn-primary" onClick={() => setOpen(true)}><PlusCircle size={18} /> Add Skill</button>
  </div>
  {skills.length ? (
    <div className="grid-2">
      {skills.map(skill => (
        <div className="glass-card skill-card" key={skill.id}>
          <div className="skill-card-head">
            <div><Code2 size={18} /><strong>{skill.name}</strong></div>
            <button className="icon-button" onClick={() => onDeleteSkill(skill.id)}><Trash2 size={15} /></button>
          </div>
          <p>{skill.category} · {skill.level}</p>
          <div className="progress"><div style={{ width: `${skill.percent}%` }} /></div>
          <span>{skill.percent}%</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="glass-card empty">
      <Code2 size={32} />
      <h3>No skills added yet</h3>
      <p>Add the technologies you are currently learning.</p>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>Add a Skill</button>
    </div>
  )}
  {open && (
    <div className="modal-backdrop" onClick={() => setOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Add Skill</h2>
          <button className="icon-button" onClick={() => setOpen(false)}><X size={17} /></button>
        </div>
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Skill name</label>
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="React" required />
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
                <option>Frontend</option>
                <option>Languages</option>
                <option>Tools</option>
                <option>Backend</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Level</label>
              <select className="select" value={level} onChange={e => setLevel(e.target.value)}>
                {Object.keys(levelPercent).map(item => <option key={item}>{item}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
            <button className="btn btn-primary">Add Skill</button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
  );
}
