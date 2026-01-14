import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch teams');
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="mb-4">
        <h2>
          <i className="bi bi-people-fill me-2" style={{color: '#667eea'}}></i>
          Teams
        </h2>
        <p className="text-muted">Join a team and compete together!</p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading teams...</p>
        </div>
      ) : error ? (
        <div className="error">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error: {error}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-people" style={{fontSize: '3rem'}}></i>
          <p className="mt-3">No teams found. Create the first team!</p>
        </div>
      ) : (
        <div className="row">
          {teams.map((team, idx) => (
            <div key={team.id || idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-flag-fill me-2"></i>
                    {team.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {team.description || 'No description available'}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">
                      <i className="bi bi-people me-1"></i>
                      {team.member_count || 0} members
                    </span>
                    <span className="badge bg-primary">
                      {team.points || 0} pts
                    </span>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-sm w-100">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Join Team
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-success">
          <i className="bi bi-plus-circle me-2"></i>
          Create New Team
        </button>
      </div>
    </div>
  );
}

export default Teams;
