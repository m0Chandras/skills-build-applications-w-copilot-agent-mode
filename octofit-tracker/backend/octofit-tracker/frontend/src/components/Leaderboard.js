import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getBadgeColor = (rank) => {
    if (rank === 1) return 'warning';
    if (rank === 2) return 'secondary';
    if (rank === 3) return 'danger';
    return 'primary';
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">
            <i className="bi bi-bar-chart-fill me-2"></i>
            Leaderboard
          </h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="error">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="bi bi-trophy" style={{fontSize: '3rem'}}></i>
              <p className="mt-3">No rankings yet. Start competing!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Points</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr key={entry.id || idx} className={idx < 3 ? 'table-light' : ''}>
                      <td>
                        <h4 className="mb-0">{getMedalIcon(idx + 1)}</h4>
                      </td>
                      <td>
                        <strong>{entry.team_name || entry.team}</strong>
                      </td>
                      <td>
                        <span className={`badge bg-${getBadgeColor(idx + 1)}`}>
                          {entry.points} points
                        </span>
                      </td>
                      <td>
                        {idx === 0 && <span className="badge bg-success">Leader</span>}
                        {idx > 0 && idx <= 2 && <span className="badge bg-info">Top 3</span>}
                        {idx > 2 && <span className="badge bg-light text-dark">Competing</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Teams Competing: <strong>{leaderboard.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
