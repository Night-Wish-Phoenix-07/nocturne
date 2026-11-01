import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Avatar from '../components/Avatar.jsx';

export default function History() {
  const { convos, getCharacter, deleteConvo } = useApp();
  const items = Object.entries(convos)
    .filter(([id, v]) => getCharacter(id) && v.messages.some((m) => m.role === 'user'))
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
  return (
    <>
      <h1>Chat history</h1>
      {items.length ? (
        <ul className="list">
          {items.map(([id, v]) => {
            const c = getCharacter(id);
            const last = v.messages[v.messages.length - 1];
            return (
              <li key={id}>
                <Avatar c={c} size={44} />
                <Link to={`/chat/${id}`} className="grow">
                  <strong>{c.name}</strong>
                  <span className="muted small-text"> {new Date(v.updatedAt).toLocaleDateString()}</span>
                  <p className="muted preview">{last.text}</p>
                </Link>
                <button className="icon-btn" aria-label={`Delete conversation with ${c.name}`} onClick={() => window.confirm('Delete this conversation?') && deleteConvo(id)}><Trash2 size={18} /></button>
              </li>
            );
          })}
        </ul>
      ) : <div className="empty"><p>No conversations yet. Pick a character and say hello.</p><Link className="btn" to="/explore">Explore characters</Link></div>}
    </>
  );
}
