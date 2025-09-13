import React from 'react'

export const ErrorState = ({ title = 'Something went wrong', message = 'Please try again.', onRetry }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
      <div className="mb-3" style={{ fontSize: '2rem' }}>⚠️</div>
      <h5 className="fw-bold mb-2" style={{ color: '#8B0000' }}>{title}</h5>
      <p className="text-muted" style={{ maxWidth: 520 }}>{message}</p>
      {onRetry && (
        <button className="btn" style={{ backgroundColor: '#223B7D', color: '#fff', border: 'none' }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorState




