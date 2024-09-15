import React, { useState } from 'react';
import { sendOtp, verifyOtp } from '../api';

const OtpVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await sendOtp({ phoneNumber });
      console.log('OTP sent:', response.data);
      setOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP:', err.response.data.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({ phoneNumber, otp });
      console.log('OTP verified:', response.data);
    } catch (err) {
      console.error('OTP verification failed:', err.response.data.message);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OtpVerification;
