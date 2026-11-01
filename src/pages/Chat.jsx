import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Send, Trash2, FlaskConical } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Avatar from '../components/Avatar.jsx';
import { demoReply } from '../utils/demoEngine.js';

const greetingMsg = (c) => [{ id: 'g' + Date.now(), role: 'character', text: c.greeting, ts: Date.now(), demo: true }];
const time = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export default function Chat() {
  const { id } = useParams();
  const { getCharacter, convos, setConvo } = useApp();
  const c = getCharacter(id);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef(null);
  const msgs = convos[id]?.messages || [];

  useEffect(() => { if (c && !convos[id]) setConvo(id, greetingMsg(c)); }, [id]); // eslint-disable-line
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs.length, typing]);

  if (!c) return <div className="empty"><h2>Character not found</h2><Link className="btn" to="/explore">Explore characters</Link></div>;

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t || typing) return;
    const next = [...msgs, { id: 'u' + Date.now(), role: 'user', text: t, ts: Date.now() }];
    setConvo(id, next);
    setText('');
    setTyping(true);
    setTimeout(() => {
      setConvo(id, [...next, { id: 'c' + Date.now(), role: 'character', text: demoReply(c, t), ts: Date.now(), demo: true }]);
      setTyping(false);
    }, 800);
  };
  const clear = () => { if (window.confirm('Clear this conversation?')) setConvo(id, greetingMsg(c)); };

  return (
    <div className="chat">
      <header className="chat-head">
        <Avatar c={c} size={48} />
        <div><Link to={`/character/${c.id}`}><strong>{c.name}</strong></Link><p className="muted small-text">{c.description}</p></div>
        <button className="icon-btn" onClick={clear} aria-label="Clear conversation"><Trash2 size={18} /></button>
      </header>
      <p className="banner"><FlaskConical size={16} /> Demo mode: replies are pre-written, not from a real AI model yet.</p>
      <div className="messages" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`msg ${m.role}`}>
            <p>{m.text}</p>
            <span className="meta">{m.demo && <em className="demo">demo</em>} {time(m.ts)}</span>
          </div>
        ))}
        {typing && <div className="msg character"><p className="muted">{c.name} is typing…</p></div>}
        <div ref={end} />
      </div>
      <form className="composer" onSubmit={send}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={`Message ${c.name}`} maxLength={500} aria-label="Message" />
        <button className="btn" type="submit" disabled={!text.trim() || typing}><Send size={18} /> Send</button>
      </form>
    </div>
  );
}
