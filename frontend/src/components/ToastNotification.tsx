import React, { useRef } from 'react';
import { Toast } from 'bootstrap';

interface ToastNotificationProps {
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  // Function to show the toast
  const showToast = () => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <div className='toast-container position-fixed bottom-0 end-0 p-3'>
        <div
          ref={toastRef}
          className='toast align-items-center text-white bg-success border-0'
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

      {/* Hidden button to trigger toast externally */}
      <button className='d-none' id='triggerToast' onClick={showToast}></button>
    </>
  );
};

export default ToastNotification;
