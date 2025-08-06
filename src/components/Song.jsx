
export const Song = ({ fn, Song }) => {
  const showPlayer = () => {
    fn(true, Song);
  };

  // Only show songs that have preview URLs (playable tracks)
  if (!Song.previewUrl) {
    return null;
  }

  // Format duration from milliseconds
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden song-card mb-3" 
         style={{transition: 'all 0.3s ease', cursor: 'pointer'}}
         onMouseEnter={(e) => {
           e.currentTarget.style.transform = 'translateY(-4px)';
           e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
         }}
         onMouseLeave={(e) => {
           e.currentTarget.style.transform = 'translateY(0)';
           e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
         }}>
      <div className="card-body p-3">
        <div className="row align-items-center g-3">
          <div className="col-auto">
            <div className="position-relative">
              <img 
                src={Song.artworkUrl100 || 'https://via.placeholder.com/80x80/6366f1/white?text=♪'} 
                alt="Song artwork"
                className="rounded-3 shadow-sm"
                style={{width: '80px', height: '80px', objectFit: 'cover'}}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80/6366f1/white?text=♪';
                }}
              />
              <div className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-75 rounded-circle d-flex align-items-center justify-content-center opacity-0 play-overlay"
                   style={{width: '32px', height: '32px', transition: 'opacity 0.3s ease'}}>
                <i className="fas fa-play text-white" style={{fontSize: '12px', marginLeft: '2px'}}></i>
              </div>
            </div>
          </div>
          
          <div className="col">
            <h5 className="card-title fw-bold mb-1 text-truncate text-primary" style={{fontSize: '16px'}}>
              {Song.trackName}
            </h5>
            <p className="card-text text-muted mb-1 text-truncate fw-medium" style={{fontSize: '14px'}}>
              {Song.artistName}
            </p>
            {Song.collectionName && (
              <p className="card-text text-muted mb-2 text-truncate" style={{fontSize: '12px'}}>
                {Song.collectionName}
              </p>
            )}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {Song.trackTimeMillis && (
                <span className="badge bg-light text-dark rounded-pill" style={{fontSize: '10px'}}>
                  <i className="fas fa-clock me-1"></i>
                  {formatDuration(Song.trackTimeMillis)}
                </span>
              )}
              {Song.primaryGenreName && (
                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill" style={{fontSize: '10px'}}>
                  {Song.primaryGenreName}
                </span>
              )}
            </div>
          </div>
          
          <div className="col-auto">
            <button 
              onClick={showPlayer}
              className="btn btn-success btn-lg rounded-3 px-3 py-2 fw-semibold shadow-sm"
              style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', border: 'none', transition: 'all 0.3s ease'}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="fas fa-play me-2"></i>
              <span className="d-none d-sm-inline">Play</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};