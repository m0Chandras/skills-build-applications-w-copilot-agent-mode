import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
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
          <i className="bi bi-clipboard-check me-2" style={{color: '#667eea'}}></i>
          Workouts
        </h2>
        <p className="text-muted">Browse personalized workout suggestions</p>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading workouts...</p>
        </div>
      ) : error ? (
        <div className="error">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Error: {error}
        </div>
      ) : workouts.length === 0 ? (
        <div className="text-center text-muted py-4">
          <i className="bi bi-clipboard-x" style={{fontSize: '3rem'}}></i>
          <p className="mt-3">No workouts available yet.</p>
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout, idx) => (
            <div key={workout.id || idx} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="bi bi-dumbbell me-2"></i>
                    {workout.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {workout.description || 'No description available'}
                  </p>
                  <div className="mt-3">
                    {workout.duration && (
                      <div className="mb-2">
                        <i className="bi bi-clock me-1"></i>
                        <small className="text-muted">
                          Duration: <strong>{workout.duration} min</strong>
                        </small>
                      </div>
                    )}
                    {workout.difficulty && (
                      <div className="mb-2">
                        <i className="bi bi-speedometer me-1"></i>
                        <small className="text-muted">
                          Difficulty: 
                          <span className={`badge ms-1 ${
                            workout.difficulty === 'Easy' ? 'bg-success' :
                            workout.difficulty === 'Medium' ? 'bg-warning' :
                            'bg-danger'
                          }`}>
                            {workout.difficulty}
                          </span>
                        </small>
                      </div>
                    )}
                    {workout.category && (
                      <div>
                        <i className="bi bi-tag me-1"></i>
                        <small className="text-muted">
                          Category: <span className="badge bg-info">{workout.category}</span>
                        </small>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-sm w-100">
                    <i className="bi bi-play-circle me-1"></i>
                    Start Workout
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
          Create Custom Workout
        </button>
      </div>
    </div>
  );
}

export default Workouts;
