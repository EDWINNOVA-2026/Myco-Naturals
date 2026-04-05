import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminApprovals() {
  const { approveApplication, rejectApplication } = useAuth();
  const navigate = useNavigate();
  
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const allApps = JSON.parse(localStorage.getItem('franchise_applications') || '[]');
    setApplications(allApps);
  };

  const handleApprove = (appId) => {
    approveApplication(appId);
    loadApplications();
  };

  const handleReject = (appId) => {
    if (window.confirm('Reject this application?')) {
      rejectApplication(appId);
      loadApplications();
    }
  };

  const filteredApps = applications.filter(app => 
    filter === 'all' ? true : app.status === filter
  );

  const stats = {
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', paddingTop: '120px', color: '#fff' }}>
      <button onClick={() => navigate('/')} style={{ color: '#3b82f6', cursor: 'pointer', marginBottom: '20px', background: 'none', border: 'none', fontSize: '14px' }}>
        ? Back to Home
      </button>
      
      <h1 style={{ marginBottom: '10px', marginTop: 0 }}>?? Admin - Franchise Applications</h1>
      <p style={{ color: '#999', marginBottom: '30px' }}>Review and approve franchise applications</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', color: '#fbbf24' }}>? {stats.pending}</div>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '5px', margin: 0 }}>Pending Review</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', color: '#10b981' }}>? {stats.approved}</div>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '5px', margin: 0 }}>Approved</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', color: '#ef4444' }}>? {stats.rejected}</div>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '5px', margin: 0 }}>Rejected</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['pending', 'approved', 'rejected', 'all'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: filter === f ? '#3b82f6' : 'rgba(255,255,255,0.05)',
              color: filter === f ? '#fff' : '#999'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredApps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
          <p style={{ color: '#999' }}>No applications to show</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredApps.map((app) => (
            <div key={app.id} style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', margin: '0 0 10px 0' }}>{app.name}</h3>
                  <p style={{ color: '#999', fontSize: '13px', margin: '5px 0' }}>?? {app.email}</p>
                  <p style={{ color: '#999', fontSize: '13px', margin: '5px 0' }}>?? {app.phone}</p>
                  <p style={{ color: '#999', fontSize: '13px', margin: '5px 0' }}>?? {app.city}</p>
                  <p style={{ color: '#999', fontSize: '12px', margin: '10px 0 0 0' }}>
                    Status: <span style={{
                      color: app.status === 'pending' ? '#fbbf24' : app.status === 'approved' ? '#10b981' : '#ef4444',
                      fontWeight: 'bold'
                    }}>
                      {app.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                {app.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleApprove(app.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#10b981',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      ? Approve
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      ? Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
