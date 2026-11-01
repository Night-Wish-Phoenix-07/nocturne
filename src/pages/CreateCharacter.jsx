import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORIES } from '../data/characters.js';

const EMPTY = { name: '', image: '', description: '', personality: '', background: '', greeting: '', category: CATEGORIES[0], visibility: 'public' };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter a name of at least 2 characters.';
  if (f.image && !/^https?:\/\/\S+$/i.test(f.image.trim())) e.image = 'Use a full link starting with http:// or https://';
  if (!f.description.trim()) e.description = 'Add a short description.';
  if (f.description.length > 120) e.description = 'Keep the description under 120 characters.';
  if (f.personality.trim().length < 10) e.personality = 'Describe the personality in at least 10 characters.';
  if (f.background.trim().length < 10) e.background = 'Add a background story of at least 10 characters.';
  if (!f.greeting.trim()) e.greeting = 'Write a greeting message.';
  return e;
}

export default function CreateCharacter() {
  const { id } = useParams();
  const { mine, saveCharacter, deleteCharacter } = useApp();
  const nav = useNavigate();
  const existing = id ? mine.find((c) => c.id === id) : null;
  const [f, setF] = useState(existing || EMPTY);
  const [errors, setErrors] = useState({});
  if (id && !existing) return <div className="empty"><h2>You can only edit characters you created</h2><Link className="btn" to="/library">Go to my library</Link></div>;

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const clean = Object.fromEntries(Object.entries(f).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
    const hue = existing?.hue ?? Math.floor(Math.random() * 360);
    nav(`/character/${saveCharacter({ ...clean, hue, emoji: existing?.emoji || '✨' })}`);
  };
  const remove = () => { if (window.confirm(`Delete ${f.name}? This cannot be undone.`)) { deleteCharacter(id); nav('/library'); } };
  const field = (k, label, props = {}, Tag = 'input') => (
    <label className="field">{label}
      <Tag value={f[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <span className="error">{errors[k]}</span>}
    </label>
  );

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h1>{id ? 'Edit character' : 'Create a character'}</h1>
      {field('name', 'Name', { maxLength: 40 })}
      {field('image', 'Profile image link (optional)', { placeholder: 'https://…' })}
      {field('description', 'Short description', { maxLength: 120 })}
      {field('personality', 'Personality', { rows: 3 }, 'textarea')}
      {field('background', 'Background story', { rows: 4 }, 'textarea')}
      {field('greeting', 'Greeting message', { rows: 2 }, 'textarea')}
      <label className="field">Category
        <select value={f.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="field">Visibility
        <select value={f.visibility} onChange={set('visibility')}>
          <option value="public">Public: everyone can find it</option>
          <option value="private">Private: only you</option>
        </select>
      </label>
      <p className="muted small-text">Keep characters friendly: fantasy, adventure, mystery, friendship and storytelling.</p>
      <div className="actions">
        <button className="btn glow" type="submit">{id ? 'Save changes' : 'Create character'}</button>
        {id && <button type="button" className="btn ghost danger" onClick={remove}>Delete</button>}
      </div>
    </form>
  );
}
