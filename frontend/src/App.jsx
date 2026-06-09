import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Activity } from 'lucide-react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';

const API_URL = 'http://localhost:8000/patients';

function App() {
  const [patients, setPatients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/`);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (patientData) => {
    try {
      if (editingPatient) {
        await axios.put(`${API_URL}/${editingPatient.id}`, patientData);
      } else {
        await axios.post(`${API_URL}/`, patientData);
      }
      setIsFormOpen(false);
      setEditingPatient(null);
      fetchPatients();
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Failed to save patient. Check console for details.');
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Health AI Predictor</h1>
        <p>Intelligent blood test analysis and risk assessment</p>
      </header>

      {isFormOpen ? (
        <PatientForm 
          initialData={editingPatient} 
          onSave={handleSave} 
          onCancel={() => {
            setIsFormOpen(false);
            setEditingPatient(null);
          }} 
        />
      ) : (
        <>
          <div className="layout-header">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={24} color="var(--primary)" /> 
              Patient Records
            </h2>
            <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
              <PlusCircle size={18} /> Add Patient
            </button>
          </div>
          
          {loading ? (
            <div className="text-center" style={{ padding: '3rem' }}>
              <p>Loading patient records...</p>
            </div>
          ) : (
            <PatientList 
              patients={patients} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
