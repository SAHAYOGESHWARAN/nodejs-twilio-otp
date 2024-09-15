require('dotenv').config();
const twilio = require('twilio');

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SERVICE_SID) {
  throw new Error('Twilio Account SID, Auth Token, or Service SID is missing.');
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({
      success: false,
      message: 'Phone number is required.',
    });
  }

  // Remove any extra '+' signs and ensure only one '+' at the beginning
  const formattedPhoneNumber = phoneNumber.replace(/^(\+)?/, '+');

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: formattedPhoneNumber,
        channel: 'sms',
      });

    return res.status(200).send({
      success: true,
      message: 'OTP sent successfully.',
      payload: result,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: `Error in sending OTP: ${err.message}`,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).send({
      success: false,
      message: 'Phone number and OTP are required.',
    });
  }

  // Remove any extra '+' signs and ensure only one '+' at the beginning
  const formattedPhoneNumber = phoneNumber.replace(/^(\+)?/, '+');

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: formattedPhoneNumber,
        code: otp,
      });

    if (result.status === 'approved') {
      return res.status(200).send({
        success: true,
        message: 'OTP verified successfully.',
        payload: result,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: 'OTP verification failed.',
      });
    }
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: `Error in verifying OTP: ${err.message}`,
    });
  }
};

module.exports = { sendOtp, verifyOtp };
