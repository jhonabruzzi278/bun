import React from 'react';
import { Toaster } from 'sonner';

export default function GlobalToaster() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: {
          background: '#241512',
          border: '1px solid #4D2D26',
          color: '#FAF7F2',
        },
      }}
    />
  );
}
