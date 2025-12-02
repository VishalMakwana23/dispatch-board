import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  InputAdornment, 
  IconButton,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    setError('');
    setEmailError(false);
    setPasswordError(false);

    let isValid = true;

    if (!email) {
      setEmailError(true);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    }

    if (!password) {
      setPasswordError(true);
      isValid = false;
    }

    if (!isValid) return;

    const result = login(email, password);

    if (result.success) {
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      if (result.role === 'client') {
        navigate('/dashboard');
      } else if (result.role === 'admin') {
        navigate('/admin');
      }
    } else {
      setError(result.error);
    }
  };

  const isFormValid = email && password && validateEmail(email);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#EAF1EC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          width: '410px',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#FCEFE5',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 2,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#0B3B32', mb: 1 }}>
             ⚡ ziing.ai
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#000000' }}>
            Login
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
            Email *
          </Typography>
          <TextField
            fullWidth
            placeholder="example@email.com"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                fontStyle: email ? 'normal' : 'italic',
              },
              '& input::placeholder': {
                fontStyle: 'italic',
                color: '#A0A0A0',
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
            Password *
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Type here"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                fontStyle: password ? 'normal' : 'italic',
              },
              '& input::placeholder': {
                fontStyle: 'italic',
                color: '#A0A0A0',
              },
            }}
          />
          {error && (
            <FormHelperText error sx={{ mt: 0.5, fontSize: '12px' }}>
              {error}
            </FormHelperText>
          )}
        </Box>

        <Link href="#" underline="always" sx={{ color: '#333', fontSize: '12px', fontWeight: 600, alignSelf: 'flex-start' }}>
          Forgot Password?
        </Link>

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              sx={{
                color: '#333',
                '&.Mui-checked': {
                  color: '#0B3B32',
                },
              }}
            />
          }
          label={<Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Remember me</Typography>}
          sx={{ mt: -1 }}
        />

        <Button
          fullWidth
          variant="contained"
          disabled={!isFormValid}
          onClick={handleLogin}
          sx={{
            height: '46px',
            borderRadius: '32px',
            backgroundColor: '#0B3B32',
            color: '#FFFFFF',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#082e27',
            },
            '&.Mui-disabled': {
              backgroundColor: '#E3E3E3',
              color: '#A0A0A0',
            },
            mt: 1,
          }}
        >
          {isFormValid ? 'Log In' : 'Login'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ fontSize: '12px' }}>
            Don't have an account?{' '}
            <Link href="#" underline="always" sx={{ color: '#333', fontWeight: 700 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="caption" sx={{ fontSize: '10px', color: '#666', lineHeight: 1.2, display: 'block' }}>
            By accessing and using this platform/website, you agree to be bound by the{' '}
            <Link href="#" sx={{ color: '#000', fontWeight: 700, textDecoration: 'underline' }}>Terms of Use</Link>
            {' '}and{' '}
            <Link href="#" sx={{ color: '#000', fontWeight: 700, textDecoration: 'underline' }}>Privacy Notice</Link>
          </Typography>
        </Box>
      </Card>

      {/* Placeholder for bottom illustration */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px', // Adjust height as needed
          backgroundImage: 'linear-gradient(to top, #d0e0d8 0%, transparent 100%)', // Simple gradient placeholder
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default LoginPage;
