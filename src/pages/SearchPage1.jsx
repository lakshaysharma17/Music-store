import { Songs } from "../components/Songs";
import { Search } from "../components/Search";
import { getSongs } from "../services/api-client";
import { useEffect, useState } from "react";
import { Player } from "../components/Player";
export const SearchPage1 = () => {
  const [flag, setFlag] = useState(false);
  const [allSongs, setSongs] = useState([]);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSongs = async () => {
    setLoading(true);
    try {
      setSongs(await getSongs('Latest Songs'));
    } catch (error) {
      console.error('Error loading songs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const togglePlayer = (flag, songarg) => {
    setSong(songarg);
    setFlag(flag);
  };

  const getArtistName = async (artistName) => {
    if (!artistName.trim()) return;
    
    setLoading(true);
    try {
      console.log('Searching for artist:', artistName);
      setSongs(await getSongs(artistName));
    } catch (error) {
      console.error('Error searching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  const mainView = (
    <>
      <Search fn={getArtistName} />
      {loading ? (
        <div className="text-center py-5">
          <div className="d-inline-block position-relative mb-4">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-border text-secondary position-absolute top-0 start-0" role="status" 
                 style={{width: '3rem', height: '3rem', animationDirection: 'reverse', animationDuration: '1.5s'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h3 className="fw-semibold text-dark mb-2">Searching for music...</h3>
          <p className="text-muted">Finding the best songs for you</p>
        </div>
      ) : (
        <Songs fn={togglePlayer} allSongs={allSongs} />
      )}
    </>
  );

  return (
    <div className="min-vh-100" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'}}>
      {/* Animated background elements */}
      <div className="position-absolute w-100 h-100 overflow-hidden" style={{pointerEvents: 'none', zIndex: 1}}>
        <div className="position-absolute rounded-circle" 
             style={{
               top: '-40px', left: '-40px', width: '300px', height: '300px',
               background: 'rgba(167, 139, 250, 0.1)', filter: 'blur(40px)',
               animation: 'float 6s ease-in-out infinite'
             }}></div>
        <div className="position-absolute rounded-circle" 
             style={{
               top: '-40px', right: '-40px', width: '300px', height: '300px',
               background: 'rgba(251, 191, 36, 0.1)', filter: 'blur(40px)',
               animation: 'float 6s ease-in-out infinite', animationDelay: '2s'
             }}></div>
        <div className="position-absolute rounded-circle" 
             style={{
               bottom: '-40px', left: '80px', width: '300px', height: '300px',
               background: 'rgba(236, 72, 153, 0.1)', filter: 'blur(40px)',
               animation: 'float 6s ease-in-out infinite', animationDelay: '4s'
             }}></div>
      </div>

      <div className="position-relative" style={{zIndex: 2}}>
        <div className="container py-4">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 shadow-lg" 
                 style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <i className="fas fa-music text-white" style={{fontSize: '32px'}}></i>
            </div>
            <h1 className="display-4 fw-black mb-3" 
                style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', 
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Music App
            </h1>
            <p className="lead text-muted mb-0">
              Discover, stream, and enjoy millions of songs from iTunes library.
            </p>
            <p className="text-muted">Your music journey starts here 🎵</p>
          </div>
          
          {flag ? <Player fn={togglePlayer} song={song} /> : mainView}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        .song-card:hover .play-overlay {
          opacity: 1 !important;
        }
        
        .btn:hover {
          transform: translateY(-1px);
        }
        
        @media (max-width: 576px) {
          .display-4 {
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    </div>
  );
};

export default SearchPage1;