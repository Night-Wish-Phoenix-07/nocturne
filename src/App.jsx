import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import Chat from './pages/Chat.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';
import Library from './pages/Library.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/create" element={<CreateCharacter />} />
          <Route path="/edit/:id" element={<CreateCharacter />} />
          <Route path="/library" element={<Library />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div className="empty"><h2>Page not found</h2><Link className="btn" to="/">Back to home</Link></div>} />
        </Routes>
      </main>
    </>
  );
}
