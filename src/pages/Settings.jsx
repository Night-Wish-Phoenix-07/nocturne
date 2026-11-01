import { useApp } from '../context/AppContext.jsx';

export default function Settings() {
  const { prefs, setPrefs, resetAll } = useApp();
  return (
    <div className="form">
      <h1>Profile and settings</h1>
      <div className="banner">Google sign-in, your Google photo and sign-out arrive in Milestone 2. For now your data stays in this browser only.</div>
      <label className="field">Display name
        <input value={prefs.name} maxLength={30} onChange={(e) => setPrefs({ ...prefs, name: e.target.value })} />
      </label>
      <label className="check">
        <input type="checkbox" checked={prefs.reduceMotion} onChange={(e) => setPrefs({ ...prefs, reduceMotion: e.target.checked })} />
        Reduce animations
      </label>
      <div className="actions">
        <button className="btn ghost danger" onClick={() => window.confirm('Delete all characters, favourites and chats from this browser?') && resetAll()}>Clear all local data</button>
      </div>
    </div>
  );
}
