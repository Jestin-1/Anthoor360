import React, { useState } from 'react';
import { FACILITIES, WARDS, CATEGORIES } from '../data/anthoorData';
import { 
  ShieldCheck, 
  Check, 
  X 
} from 'lucide-react';

export default function AdminDashboardPage() {
  
  // Pending business approvals state
  const [pendingBusinesses, setPendingBusinesses] = useState([
    { id: 'pb-1', name: 'Malabar Spices & Condiments', category: 'Commercial', ward: 'Ward 7 - Dharmasala', phone: '94471 99882', status: 'Pending Review' },
    { id: 'pb-2', name: 'Anthoor Eco Tours & Kayaking', category: 'Tourism Services', ward: 'Ward 10 - Parassinikkadavu', phone: '98470 11223', status: 'Pending Review' }
  ]);

  // Reported civic issues state
  const [civicIssues, setCivicIssues] = useState([
    { id: 'ANT-2026-104921', type: 'Road Damage', title: 'Pothole near Mangattuparamba gate', ward: 'Ward 8', status: 'Under Review', date: '2026-09-23' },
    { id: 'ANT-2026-104880', type: 'Streetlight', title: '5 streetlights non-functional on Vellikkeel road', ward: 'Ward 4', status: 'In Progress', date: '2026-09-21' },
    { id: 'ANT-2026-104712', type: 'Drainage', title: 'Waterlogging near Dharmasala bus stop', ward: 'Ward 7', status: 'Resolved', date: '2026-09-18' }
  ]);

  const handleApproveBusiness = (id) => {
    setPendingBusinesses(prev => prev.filter(b => b.id !== id));
  };

  const handleRejectBusiness = (id) => {
    setPendingBusinesses(prev => prev.filter(b => b.id !== id));
  };

  const handleUpdateIssueStatus = (id, newStatus) => {
    setCivicIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue));
  };

  const verifiedCount = FACILITIES.filter(f => f.verified).length;
  const verifiedPercentage = Math.round((verifiedCount / FACILITIES.length) * 100);

  return (
    <div style={{ paddingBottom: '80px', backgroundColor: 'var(--surface-50)' }}>
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A, #1E293B)',
        color: '#FFFFFF',
        padding: '48px 0 64px 0'
      }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: '12px' }}>
                <ShieldCheck size={14} color="#10B981" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#10B981' }}>
                  ADMINISTRATIVE ACCESS
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0 }}>
                Anthoor 360 Municipal Command Dashboard
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>
                Verification queues, spatial analytics, civic issues resolution, and directory moderation.
              </p>
            </div>

            <div style={{ backgroundColor: '#0F172A', border: '1px solid #334155', padding: '12px 20px', borderRadius: '14px', textAlign: 'right' }}>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>SYSTEM INTEGRITY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10B981' }}>
                PostGIS & REST Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Overview Cards */}
      <div className="container" style={{ marginTop: '-32px', marginBottom: '40px' }}>
        <div className="grid grid-cols-4 gap-6">
          
          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL FACILITIES</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-800)', margin: '4px 0' }}>
              {FACILITIES.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} />
              <span>{verifiedPercentage}% Officially Verified</span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>MUNICIPAL WARDS</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0D9488', margin: '4px 0' }}>
              {WARDS.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              100% Polygon Mapped
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PENDING REVIEWS</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#D97706', margin: '4px 0' }}>
              {pendingBusinesses.length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--accent-amber)' }}>
              Businesses awaiting approval
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE CIVIC ISSUES</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#E11D48', margin: '4px 0' }}>
              {civicIssues.filter(i => i.status !== 'Resolved').length}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Reported by residents
            </div>
          </div>

        </div>
      </div>

      {/* Main Administrative Sections */}
      <div className="container">
        <div className="grid grid-cols-2 gap-8">
          
          {/* Section A: Business Directory Approval Queue */}
          <div className="glass-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  Business Verification Queue
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Review submissions before marking as Verified in directory
                </p>
              </div>
              <span className="badge badge-pending">
                {pendingBusinesses.length} Pending
              </span>
            </div>

            {pendingBusinesses.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                All business submissions have been verified and processed.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {pendingBusinesses.map(bus => (
                  <div key={bus.id} style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-50)',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {bus.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {bus.category} • {bus.ward} • Ph: {bus.phone}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveBusiness(bus.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '6px 12px', borderRadius: '8px' }}
                        title="Approve and mark verified"
                      >
                        <Check size={14} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleRejectBusiness(bus.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 10px', borderRadius: '8px', color: '#E11D48' }}
                        title="Reject submission"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section B: Reported Civic Issues Manager */}
          <div className="glass-card" style={{ padding: '28px', backgroundColor: '#FFFFFF' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  Civic Issues Resolution Desk
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Assign engineers, update work orders, and mark resolved
                </p>
              </div>
              <span className="badge badge-urgent">
                {civicIssues.length} Tickets
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {civicIssues.map(issue => (
                <div key={issue.id} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface-50)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--primary-800)', fontFamily: 'monospace' }}>
                        {issue.id}
                      </span>
                      <span className="badge badge-category" style={{ fontSize: '0.72rem' }}>
                        {issue.type}
                      </span>
                    </div>
                    <select
                      value={issue.status}
                      onChange={e => handleUpdateIssueStatus(issue.id, e.target.value)}
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: issue.status === 'Resolved' ? '#D1FAE5' : '#FEF3C7',
                        color: issue.status === 'Resolved' ? '#065F46' : '#92400E'
                      }}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {issue.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Locality: {issue.ward} • Reported: {issue.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section C: Facilities Distribution by Category */}
        <div className="glass-card" style={{ padding: '28px', backgroundColor: '#FFFFFF', marginTop: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '20px' }}>
            Facilities Distribution by Municipal Category
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const count = FACILITIES.filter(f => f.category === cat.slug).length;
              return (
                <div key={cat.id} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface-50)',
                  border: '1px solid var(--border-light)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: cat.color, margin: '4px 0' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Mapped GIS Coordinates
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
