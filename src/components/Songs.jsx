import { Song } from "./Song"

export const Songs = ({ fn, allSongs }) => {
  // Filter songs to only show those with preview URLs
  const playableSongs = allSongs.filter(song => song.previewUrl);
  
  return (
    <div className="container">
      {playableSongs.length > 0 ? (
        <>
          <div className="row align-items-center mb-4">
            <div className="col">
              <h3 className="fw-bold text-dark mb-0">
                <i className="fas fa-music text-primary me-2"></i>
                Found {playableSongs.length} playable songs
              </h3>
            </div>
            <div className="col-auto">
              <div style={{height: '2px', width: '100px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', borderRadius: '1px'}}></div>
            </div>
          </div>
          <div className="row">
            {playableSongs.map((currentSong, index) => (
              <div key={`${currentSong.trackId}-${index}`} className="col-12">
                <Song fn={fn} Song={currentSong} />
              </div>
            ))}
          </div>
        </>
      ) : allSongs.length > 0 ? (
        <div className="text-center py-5">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
               style={{width: '120px', height: '120px', background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'}}>
            <i className="fas fa-times-circle text-danger" style={{fontSize: '48px'}}></i>
          </div>
          <h3 className="fw-bold text-dark mb-3">No Playable Songs Found</h3>
          <p className="text-muted mb-2">The search results don't contain any songs with preview audio.</p>
          <p className="text-muted small">Try searching for a different artist or song.</p>
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
               style={{width: '120px', height: '120px', background: 'linear-gradient(135deg, #ddd6fe 0%, #c7d2fe 100%)'}}>
            <i className="fas fa-music text-primary" style={{fontSize: '48px'}}></i>
          </div>
          <h3 className="fw-bold text-dark mb-3">Start Your Musical Journey</h3>
          <p className="text-muted">Search for your favorite artists to discover amazing songs! 🎵</p>
        </div>
      )}
    </div>
  );
};
