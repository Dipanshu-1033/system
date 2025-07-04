
import React from 'react';
import './AppointmentCard.css';

const AppointmentCard = ({ appointment, onCancel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3>{appointment.doctorName}</h3>
        <span 
          className="appointment-status" 
          style={{ backgroundColor: getStatusColor(appointment.status) }}
        >
          {appointment.status || 'Scheduled'}
        </span>
      </div>
      <div className="appointment-details">
        <p className="appointment-date">
          <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
        </p>
        <p className="appointment-reason">
          <strong>Reason:</strong> {appointment.reason}
        </p>
      </div>
      {appointment.status !== 'cancelled' && (
        <div className="appointment-actions">
          <button 
            className="cancel-btn"
            onClick={() => onCancel(appointment.id)}
          >
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
