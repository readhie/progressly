import React from 'react';
import { useState } from 'react';
import { Shield, Save } from 'lucide-react';

export default function Privacy({ privacySettings, onUpdatePrivacy }) {
  const [settings, setSettings] = useState(privacySettings);
  const [saved, setSaved] = useState(false);

  function save(e) {
    e.preventDefault();
    onUpdatePrivacy(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return <div className="page-stack narrow">
  <div className="glass-card privacy-head">
    <Shield size={30} />
    <div>
      <span className="badge badge-indigo">Settings</span>
      <h1>Privacy</h1>
      <p>Choose how your Progressly profile and journal are shared.</p>
    </div>  
  </div>
  <form className="glass-card" onSubmit={save}>
    <div className="setting">
      <div><strong>Journal visibility</strong><p>Default visibility for new journal entries.</p></div>
      <select className="select" value={settings.defaultVisibility} onChange={e => setSettings({ ...settings, defaultVisibility: e.target.value })}>
        <option value="public">Public</option>
        <option value="connections">Connections</option>
        <option value="private">Private</option>
      </select>
    </div>
    <div className="setting">
      <div><strong>Profile visibility</strong><p>Choose who can see your profile.</p></div>
      <select className="select" value={settings.profileVisibility} onChange={e => setSettings({ ...settings, profileVisibility: e.target.value })}>
        <option value="public">Public</option>
        <option value="connections">Connections</option>
        <option value="private">Private</option>
      </select>
    </div>
    <label className="check">
      <input type="checkbox" checked={settings.showStreak} onChange={e => setSettings({ ...settings, showStreak: e.target.checked })} />
      Show my learning streak
    </label>
    <label className="check">
      <input type="checkbox" checked={settings.searchable} onChange={e => setSettings({ ...settings, searchable: e.target.checked })} />
      Allow others to find my profile
    </label>
    <div className="modal-actions">
      <button className="btn btn-primary"><Save size={16} /> {saved ? 'Saved' : 'Save Settings'}</button>
    </div>
  </form>
</div>;
}
