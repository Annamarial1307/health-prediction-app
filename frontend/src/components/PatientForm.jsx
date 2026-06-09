import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { isFuture, parseISO } from 'date-fns';

const PatientForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    email: '',
    glucose: '',
    haemoglobin: '',
    cholesterol: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        glucose: initialData.glucose.toString(),
        haemoglobin: initialData.haemoglobin.toString(),
        cholesterol: initialData.cholesterol.toString()
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name) newErrors.full_name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (isFuture(parseISO(formData.dob))) {
      newErrors.dob = 'Date of birth cannot be a future date';
    }

    if (!formData.glucose || isNaN(formData.glucose)) newErrors.glucose = 'Glucose must be a valid number';
    if (!formData.haemoglobin || isNaN(formData.haemoglobin)) newErrors.haemoglobin = 'Haemoglobin must be a valid number';
    if (!formData.cholesterol || isNaN(formData.cholesterol)) newErrors.cholesterol = 'Cholesterol must be a valid number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        glucose: parseFloat(formData.glucose),
        haemoglobin: parseFloat(formData.haemoglobin),
        cholesterol: parseFloat(formData.cholesterol)
      });
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {initialData ? 'Edit Patient' : 'Add New Patient'}
      </h2>
      
      <form onSubmit={handleSubmit} className="animate-fade-in">
        <div className="form-group">
          <label>Full Name</label>
          <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" />
          {errors.full_name && <div className="error-text">{errors.full_name}</div>}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
          {errors.dob && <div className="error-text">{errors.dob}</div>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="stats-grid">
          <div className="form-group">
            <label>Glucose</label>
            <input name="glucose" value={formData.glucose} onChange={handleChange} placeholder="mg/dL" />
            {errors.glucose && <div className="error-text">{errors.glucose}</div>}
          </div>

          <div className="form-group">
            <label>Haemoglobin</label>
            <input name="haemoglobin" value={formData.haemoglobin} onChange={handleChange} placeholder="g/dL" />
            {errors.haemoglobin && <div className="error-text">{errors.haemoglobin}</div>}
          </div>

          <div className="form-group">
            <label>Cholesterol</label>
            <input name="cholesterol" value={formData.cholesterol} onChange={handleChange} placeholder="mg/dL" />
            {errors.cholesterol && <div className="error-text">{errors.cholesterol}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
            <X size={18} /> Cancel
          </button>
          <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
            <Save size={18} /> {initialData ? 'Update Record' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
