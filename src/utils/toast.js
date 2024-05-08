import toast from 'react-hot-toast';

export const showToast = (message, color) => {
  toast.success(message, {
    style: {
      border: `2px solid ${color}`,
      padding: '13px',
      fontSize: '13px',
      color: color,
    },
    iconTheme: {
      primary: color,
      secondary: '#FFFAEE',
    },
  });
};
