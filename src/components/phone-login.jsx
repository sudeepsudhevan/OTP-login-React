import { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNmber] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)
    const handlePhoneNumber = (event) => {
        setPhoneNmber(event.target.value);
    }

    const handlePhoneSubmit = (event) => {
        event.preventDefault();
        // console.log(phoneNumber);

        //  phone validations

        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Please enter a valid phone number")
            return;
        }

        // Call Backend API to send OTP to the phone number
        // Once OTP is received, show the OtpForm
        setShowOtpInput(true);
    };
    const onOtpSubmit = (otp) => {
        console.log("Login success, OTP is: ", otp);
        // Call Backend API to verify OTP
        // If OTP is correct, redirect to Home page
        // Else show error message
    }
    return (
        <div>
            {!showOtpInput ? (
                <form onSubmit={handlePhoneSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        placeholder="Enter Phone Number" />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <p>Enter OTP sent to {phoneNumber}</p>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>
            )}
        </div>
    )
}

export default PhoneOtpForm;