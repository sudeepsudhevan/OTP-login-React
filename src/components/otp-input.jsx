import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';


const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {

    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])

    const handleChange = (index, e) => {
        const { value } = e.target;
        if (isNaN(value)) return

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onOtpSubmit(combinedOtp);
        }

        // Move to next input if current input field is filled
        // if (value && index < length - 1 && inputRefs.current[index + 1]) {
        //     inputRefs.current[index + 1].focus();
        // }

        // Move to next empty input if current input field is filled
        if (value && index < length - 1) {
            // Initialize next index
            let nextIndex = index + 1;
            // Loop until finding an empty input or reaching the end
            while (nextIndex < length - 1 && inputRefs.current[nextIndex].value) {
                nextIndex++;
            }
            // Focus on the next empty input
            inputRefs.current[nextIndex].focus();
        }

    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    }
    return (
        <div>
            {
                otp.map((value, index) => {
                    return (
                        <input
                            key={index}
                            type="text"
                            ref={(input) => inputRefs.current[index] = input}
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="otpInput"
                        />
                    );
                })
            }
        </div>
    )
}

OtpInput.propTypes = {
    length: PropTypes.number,
    onOtpSubmit: PropTypes.func.isRequired
};

export default OtpInput

