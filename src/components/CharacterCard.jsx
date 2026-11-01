import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';
import Avatar from './Avatar.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function CharacterCard({ c }) {
  const { favs, toggleFav } = useApp();
  const fav = favs.includes(c.id);
  return (
    <article className="card">
      <Link to={`/character/${c.id}`} className="card-main">
        <Avatar c={c} size={72} />
        <h3>{c.name}</h3>
        <p className="muted">{c.description}</p>
        <span className="tag">{c.category}</span>
      </Link>
      <div className="card-actions">
        <button className={`icon-btn ${fav ? 'on' : ''}`} onClick={() => toggleFav(c.id)} aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}>
          <Heart size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <Link className="btn small" to={`/chat/${c.id}`}><MessageCircle size={16} /> Chat</Link>
      </div>
    </article>
  );
}
