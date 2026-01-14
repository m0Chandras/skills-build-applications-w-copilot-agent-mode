import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch activities');
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
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
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">
            <i className="bi bi-activity me-2"></i>
            Activities
          </h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading activities...</p>
            </div>
          ) : error ? (
            <div className="error">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="bi bi-inbox" style={{fontSize: '3rem'}}></i>
              <p className="mt-3">No activities found. Start logging your workouts!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={activity.id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <span className="badge bg-primary">
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>{activity.duration}</td>
                      <td>{activity.date || 'N/A'}</td>
                      <td>{activity.user_name || activity.user || 'Unknown'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Activities: <strong>{activities.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Activities;
