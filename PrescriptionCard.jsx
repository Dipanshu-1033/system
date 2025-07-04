
import React from 'react';
import './PrescriptionCard.css';

const PrescriptionCard = ({ prescription }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isActive = () => {
    if (!prescription.endDate) return true;
    const endDate = new Date(prescription.endDate);
    const today = new Date();
    return endDate >= today;
  };

  return (
    <div className={`prescription-card ${isActive() ? 'active' : 'expired'}`}>
      <div className="prescription-header">
        <h3>{prescription.medicineName}</h3>
        <span className={`prescription-badge ${isActive() ? 'active-badge' : 'expired-badge'}`}>
          {isActive() ? 'Active' : 'Expired'}
        </span>
      </div>
      <div className="prescription-details">
        <div className="prescription-row">
          <span className="label">Dosage:</span>
          <span className="value">{prescription.dosage}</span>
        </div>
        <div className="prescription-row">
          <span className="label">Frequency:</span>
          <span className="value">{prescription.frequency}</span>
        </div>
        <div className="prescription-row">
          <span className="label">Start Date:</span>
          <span className="value">{formatDate(prescription.startDate)}</span>
        </div>
        <div className="prescription-row">
          <span className="label">End Date:</span>
          <span className="value">{formatDate(prescription.endDate)}</span>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
