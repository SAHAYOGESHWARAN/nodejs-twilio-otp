import React, { useState } from 'react';
import { sendOtp, verifyOtp } from '../api';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendOtp({ phoneNumber });
      console.log('OTP sent');
    } catch (err) {
      console.error('Error sending OTP:', err.response.data.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({ phoneNumber, otp });
      if (response.data.success) {
        console.log('OTP verified');
        setOtpVerified(true);
      }
    } catch (err) {
      console.error('OTP verification failed:', err.response.data.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Implement password reset logic here after OTP verification
  };

  return (
    <div>
      {!otpVerified ? (
        <div>
          <form onSubmit={handleSendOtp}>
            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            <button type="submit">Send OTP</button>
          </form>
          <form onSubmit={handleVerifyOtp}>
            <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <button type="submit">Verify OTP</button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
