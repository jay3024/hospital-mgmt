 const MainUrl = 'http://192.168.1.105:5218'

export const LOGIN = `${MainUrl}/api/Auth/patientLogin`
export const REGISTER = `${MainUrl}/api/Auth/patientRegister`
export const SEND_OTP = `${MainUrl}/api/PasswordReset/send-otp`
export const RESET_PASSWORD = `${MainUrl}/api/PasswordReset/reset-password`

export const DOCTOR_LOGIN = `${MainUrl}/api/DoctorAuth/loginDoctor`
export const DOCTOR_REGISTER = `${MainUrl}/api/DoctorAuth/registerDoctor`
