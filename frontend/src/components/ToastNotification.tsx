import React, { useEffect, useRef } from 'react';
import { Toast } from 'bootstrap';

interface ToastNotificationProps {
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      const toastInstance = new Toast(toastRef.current);
      toastInstance.show();
    }
  }, []); // Ensures it only runs once when mounted

  return (
    <div className='toast-container position-fixed bottom-0 end-0 p-3'>
      <div
        ref={toastRef}
        className='toast align-items-center text-white bg-success border-0 show'
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
      >
        <div className='d-flex'>
          <div className='toast-body'>{message}</div>
          <button
            type='button'
            className='btn-close btn-close-white me-2 m-auto'
            data-bs-dismiss='toast'
            aria-label='Close'
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
