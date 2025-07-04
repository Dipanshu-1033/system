
import React, { useState, useEffect } from 'react';
import { prescriptionService } from '../services/prescriptionService';
import PrescriptionCard from '../components/PrescriptionCard';
import './Prescriptions.css';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const data = await prescriptionService.getPrescriptionsByUserId();
      setPrescriptions(data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)));
    } catch (error) {
      console.error('Error loading prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await prescriptionService.addPrescription(formData);
      setFormData({
        medicineName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: ''
      });
      setShowForm(false);
      loadPrescriptions();
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="prescriptions-container">
        <div className="loading">Loading prescriptions...</div>
      </div>
    );
  }

  return (
    <div className="prescriptions-container">
      <div className="prescriptions-header">
        <h1>My Prescriptions</h1>
        <button 
          className="add-prescription-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Prescription'}
        </button>
      </div>

      {showForm && (
        <div className="prescription-form-container">
          <form onSubmit={handleSubmit} className="prescription-form">
            <h2>Add New Prescription</h2>
            
            <div className="form-group">
              <label htmlFor="medicineName">Medicine Name</label>
              <input
                type="text"
                id="medicineName"
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dosage">Dosage</label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 500mg"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date (Optional)</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <button type="submit" className="submit-btn">
              Add Prescription
            </button>
          </form>
        </div>
      )}

      <div className="prescriptions-list">
        {prescriptions.length > 0 ? (
          prescriptions.map(prescription => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No prescriptions found</h3>
            <p>Add your first prescription to start tracking your medications</p>
            <button 
              className="cta-button"
              onClick={() => setShowForm(true)}
            >
              Add Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
