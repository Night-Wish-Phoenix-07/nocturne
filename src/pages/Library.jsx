import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Section from '../components/Section.jsx';
import Avatar from '../components/Avatar.jsx';

export default function Library() {
  const { mine, characters, favs, deleteCharacter } = useApp();
  const favourites = characters.filter((c) => favs.includes(c.id));
  return (
    <>
      <h1>My library</h1>
      <section className="section">
        <div className="row"><h2>Created by me</h2><Link className="btn small" to="/create">New character</Link></div>
        {mine.length ? (
          <ul className="list">
            {mine.map((c) => (
              <li key={c.id}>
                <Avatar c={c} size={44} />
                <Link to={`/character/${c.id}`} className="grow"><strong>{c.name}</strong><span className="muted small-text"> {c.visibility}</span></Link>
                <Link className="icon-btn" to={`/edit/${c.id}`} aria-label={`Edit ${c.name}`}><Pencil size={18} /></Link>
                <button className="icon-btn" aria-label={`Delete ${c.name}`} onClick={() => window.confirm(`Delete ${c.name}?`) && deleteCharacter(c.id)}><Trash2 size={18} /></button>
              </li>
            ))}
          </ul>
        ) : <div className="empty"><p>You have not created a character yet.</p><Link className="btn" to="/create">Create your first</Link></div>}
      </section>
      <Section title="Favourites" items={favourites} />
      {!favourites.length && <section className="section"><h2>Favourites</h2><div className="empty"><p>Tap the heart on any character to save it here.</p></div></section>}
    </>
  );
}
