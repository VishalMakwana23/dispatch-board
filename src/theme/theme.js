import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C6E63', // Ziing Green
    },
    background: {
      default: '#F6F7F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          marginBottom: '5px',
          '&.Mui-selected': {
            backgroundColor: '#1C6E63',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#165950',
            },
            '& .MuiListItemIcon-root': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
});

export default theme;
