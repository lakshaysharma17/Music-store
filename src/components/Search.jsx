import { useRef } from "react";

export const Search = ({ fn }) => {
  const artist = useRef();
  
  return (
    <div className="mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="text-center mb-4">
              {/* <div className="d-inline-flex align-items-center justify-content-center bg-gradient rounded-circle mb-3" 
                   style={{width: '64px', height: '64px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                <i className="fas fa-search text-white" style={{fontSize: '24px'}}></i>
              </div> */}
              <h2 className="fw-bold text-dark mb-2">Discover Music</h2>
              <p className="text-muted">Search for your favorite artists and songs</p>
            </div>
            
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4" style={{background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)'}}>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-transparent border-end-0 rounded-start-3">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input 
                    ref={artist} 
                    type="text" 
                    className="form-control border-start-0 border-end-0 bg-transparent shadow-none"
                    placeholder="Search for artists, songs, or albums..."
                    style={{fontSize: '16px'}}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && artist.current.value.trim()) {
                        fn(artist.current.value);
                      }
                    }}
                  />
                  <button 
                    className="btn btn-primary btn-lg rounded-end-3 px-4 fw-semibold"
                    style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
                    onClick={() => {
                      if (artist.current.value.trim()) {
                        fn(artist.current.value);
                      }
                    }}
                  >
                    <i className="fas fa-search me-2"></i>
                    <span className="d-none d-sm-inline">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};