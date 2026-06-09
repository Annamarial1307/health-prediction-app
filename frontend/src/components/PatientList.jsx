import React from 'react';
import { Activity, Edit2, Trash2, Calendar, Mail } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const PatientList = ({ patients, onEdit, onDelete }) => {
  if (patients.length === 0) {
    return (
      <div className="glass-panel text-center animate-fade-in" style={{ padding: '3rem' }}>
        <Activity size={48} color="var(--primary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
        <h3>No patients found</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Add your first patient to see the AI health predictions.</p>
      </div>
    );
  }

  return (
    <div className="patient-grid">
      {patients.map((patient) => (
        <div key={patient.id} className="glass-panel patient-card animate-fade-in">
          <div className="card-header">
            <div className="card-title">
              <h3>{patient.full_name}</h3>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} /> {format(parseISO(patient.dob), 'MMM dd, yyyy')}
              </p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                <Mail size={14} /> {patient.email}
              </p>
            </div>
            <div className="card-actions">
              <button className="icon-btn" onClick={() => onEdit(patient)} title="Edit">
                <Edit2 size={18} />
              </button>
              <button className="icon-btn danger" onClick={() => onDelete(patient.id)} title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Glucose</div>
              <div className="stat-value">{patient.glucose}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Hb</div>
              <div className="stat-value">{patient.haemoglobin}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Cholest</div>
              <div className="stat-value">{patient.cholesterol}</div>
            </div>
          </div>

          <div className="ai-remark">
            <div className="label">
              <Activity size={16} /> AI Prediction
            </div>
            {patient.remarks || "No prediction generated."}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
