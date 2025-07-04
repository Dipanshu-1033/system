
import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import { prescriptionService } from '../services/prescriptionService';
import AppointmentCard from '../components/AppointmentCard';
import PrescriptionCard from '../components/PrescriptionCard';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [appointmentsData, prescriptionsData] = await Promise.all([
        appointmentService.getAllAppointments(),
        prescriptionService.getPrescriptionsByUserId()
      ]);
      
      // Get upcoming appointments (next 3)
      const upcomingAppointments = appointmentsData
        .filter(apt => new Date(apt.appointmentDate) >= new Date())
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 3);
      
      // Get active prescriptions (next 3)
      const activePrescriptions = prescriptionsData
        .filter(pres => !pres.endDate || new Date(pres.endDate) >= new Date())
        .slice(0, 3);
      
      setAppointments(upcomingAppointments);
      setPrescriptions(activePrescriptions);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
      loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.firstName}!</h1>
        <p>Here's an overview of your health information</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <a href="/appointments" className="view-all-link">View All</a>
          </div>
          <div className="section-content">
            {appointments.length > 0 ? (
              appointments.map(appointment => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancelAppointment}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No upcoming appointments</p>
                <a href="/appointments" className="cta-link">Book an appointment</a>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Active Prescriptions</h2>
            <a href="/prescriptions" className="view-all-link">View All</a>
          </div>
          <div className="section-content">
            {prescriptions.length > 0 ? (
              prescriptions.map(prescription => (
                <PrescriptionCard
                  key={prescription.id}
                  prescription={prescription}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No active prescriptions</p>
                <a href="/prescriptions" className="cta-link">Add a prescription</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/appointments" className="action-card">
            <div className="action-icon">📅</div>
            <h3>Book Appointment</h3>
            <p>Schedule your next visit</p>
          </a>
          <a href="/prescriptions" className="action-card">
            <div className="action-icon">💊</div>
            <h3>Add Prescription</h3>
            <p>Track your medications</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
