import React, { useState, useRef } from 'react';

export const Player = ({ fn, song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            {/* Header */}
            <div className="card-header text-white py-3" 
                 style={{background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'}}>
              <button 
                onClick={() => {
                  fn(false, null);
                }}
                className="btn btn-outline-light btn-sm rounded-3 px-3"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Library
              </button>
            </div>

            <div className="card-body text-center p-4" 
                 style={{background: 'linear-gradient(135deg, rgba(102,126,234,0.05) 0%, rgba(118,75,162,0.05) 100%)'}}>
              
              {/* Album Art */}
              <div className="position-relative d-inline-block mb-4">
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" 
                     style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', filter: 'blur(20px)', opacity: '0.3', transform: 'scale(1.1)'}}></div>
                <img 
                  src={song?.artworkUrl100?.replace('100x100', '600x600') || 'https://via.placeholder.com/300x300/6366f1/white?text=♪'} 
                  alt="Song Artwork"
                  className="position-relative rounded-4 shadow-lg"
                  style={{width: '280px', height: '280px', objectFit: 'cover'}}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300/6366f1/white?text=♪';
                  }}
                />
              </div>
              
              {/* Song Info */}
              <div className="mb-4">
                <h1 className="fw-bold text-dark mb-2" style={{fontSize: '24px'}}>
                  {song?.trackName}
                </h1>
                <p className="text-muted mb-2 fw-semibold" style={{fontSize: '18px'}}>
                  {song?.artistName}
                </p>
                {song?.collectionName && (
                  <p className="text-muted" style={{fontSize: '14px'}}>
                    {song?.collectionName}
                  </p>
                )}
                
                {/* Additional Info */}
                <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                  {song?.releaseDate && (
                    <span className="badge bg-light text-dark rounded-pill">
                      {new Date(song.releaseDate).getFullYear()}
                    </span>
                  )}
                  {song?.primaryGenreName && (
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill">
                      {song.primaryGenreName}
                    </span>
                  )}
                  {song?.trackTimeMillis && (
                    <span className="badge bg-success bg-opacity-10 text-success rounded-pill">
                      {Math.floor(song.trackTimeMillis / 60000)}:{((song.trackTimeMillis % 60000) / 1000).toFixed(0).padStart(2, '0')}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Custom Audio Player */}
              <div className="card bg-light border-0 rounded-3 p-3">
                <div className="d-flex justify-content-center mb-3">
                  <button
                    onClick={togglePlayPause}
                    className="btn btn-primary btn-lg rounded-circle shadow-sm"
                    style={{width: '64px', height: '64px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
                  >
                    <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} 
                       style={{fontSize: '20px', marginLeft: isPlaying ? '0' : '2px'}}></i>
                  </button>
                </div>
                
                <audio 
                  ref={audioRef}
                  controls 
                  className="w-100 rounded-2"
                  style={{ outline: 'none', height: '40px' }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src={song?.previewUrl} type="audio/mp4" />
                  Your browser does not support the audio element.
                </audio>
                
                <p className="text-muted small mt-2 mb-0">
                  🎵 30-second preview from iTunes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};