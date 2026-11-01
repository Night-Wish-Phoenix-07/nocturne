import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Pencil } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Avatar from '../components/Avatar.jsx';

export default function CharacterDetail() {
  const { id } = useParams();
  const { getCharacter, favs, toggleFav } = useApp();
  const c = getCharacter(id);
  if (!c) return <div className="empty"><h2>Character not found</h2><Link className="btn" to="/explore">Explore characters</Link></div>;
  const fav = favs.includes(c.id);
  return (
    <article className="detail">
      <Avatar c={c} size={120} />
      <div>
        <h1>{c.name}</h1>
        <span className="tag">{c.category}</span>
        <p>{c.description}</p>
        <h3>Personality</h3><p className="muted">{c.personality}</p>
        <h3>Background</h3><p className="muted">{c.background}</p>
        <h3>Greeting</h3><p className="muted">“{c.greeting}”</p>
        <div className="actions">
          <Link className="btn glow" to={`/chat/${c.id}`}><MessageCircle size={18} /> Start chatting</Link>
          <button className={`btn ghost ${fav ? 'on' : ''}`} onClick={() => toggleFav(c.id)}><Heart size={18} fill={fav ? 'currentColor' : 'none'} /> {fav ? 'Favourited' : 'Favourite'}</button>
          {c.owner === 'me' && <Link className="btn ghost" to={`/edit/${c.id}`}><Pencil size={16} /> Edit</Link>}
        </div>
      </div>
    </article>
  );
}
