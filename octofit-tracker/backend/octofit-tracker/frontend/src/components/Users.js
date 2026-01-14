import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
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
            <i className="bi bi-person-fill me-2"></i>
            Users
          </h3>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading users...</p>
            </div>
          ) : error ? (
            <div className="error">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error: {error}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="bi bi-person-x" style={{fontSize: '3rem'}}></i>
              <p className="mt-3">No users found. Be the first to join!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Team</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id || idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <strong>{user.name}</strong>
                        {user.is_superhero && (
                          <span className="ms-2" title="Superhero!">⚡</span>
                        )}
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="text-decoration-none">
                          <i className="bi bi-envelope me-1"></i>
                          {user.email}
                        </a>
                      </td>
                      <td>
                        {user.team_name || user.team ? (
                          <span className="badge bg-info">
                            {user.team_name || user.team}
                          </span>
                        ) : (
                          <span className="text-muted">No team</span>
                        )}
                      </td>
                      <td>
                        {user.is_superhero ? (
                          <span className="badge bg-warning">
                            <i className="bi bi-star-fill me-1"></i>
                            Superhero
                          </span>
                        ) : (
                          <span className="badge bg-success">Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="card-footer text-muted">
          Total Users: <strong>{users.length}</strong>
        </div>
      </div>
    </div>
  );
}

export default Users;
