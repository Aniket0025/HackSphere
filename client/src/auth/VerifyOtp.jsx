import { useState } from 'react'

const VerifyOtp = () => {

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    const verifyHandler = async () => {
        console.log({email, otp});
        await api.post('/auth/verify-otp', {email, otp})
        alert('OTP verified successfully');
    }

  return (
    <>
        <input type="text" placeholder='email' onChange={e=> setEmail(e.target.value)} />
        <input type="text" placeholder='otp' onChange={e=> setOtp(e.target.value)} />

        <button onClick={verifyHandler}>Verify OTP</button>
    </>

  )
}

export default VerifyOtp