
import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import AppointmentCard from '../components/AppointmentCard';
import './Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    doctorName: '',
    appointmentDate: '',
    reason: ''
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAllAppointments();
      setAppointments(data.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)));
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentService.bookAppointment(formData);
      setFormData({ doctorName: '', appointmentDate: '', reason: '' });
      setShowForm(false);
      loadAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
      loadAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
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
      <div className="appointments-container">
        <div className="loading">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>My Appointments</h1>
        <button 
          className="book-appointment-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Book New Appointment'}
        </button>
      </div>

      {showForm && (
        <div className="appointment-form-container">
          <form onSubmit={handleSubmit} className="appointment-form">
            <h2>Book New Appointment</h2>
            
            <div className="form-group">
              <label htmlFor="doctorName">Doctor Name</label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="appointmentDate">Appointment Date & Time</label>
              <input
                type="datetime-local"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reason">Reason for Visit</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Book Appointment
            </button>
          </form>
        </div>
      )}

      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={handleCancel}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No appointments found</h3>
            <p>Book your first appointment to get started</p>
            <button 
              className="cta-button"
              onClick={() => setShowForm(true)}
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
