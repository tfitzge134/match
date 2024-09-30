import React, { useState } from "react";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css"; // Ensure you import the styles for the phone input

const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState("Female"); // Default value

  const validatePhoneNumber = (number) => {
    // Regular expression for validating phone numbers
    const phoneRegex = /^[+]?[\d\s()-]*$/; // Allow digits, spaces, hyphens, parentheses, and plus sign
    const lengthCheck = number.length >= 10 && number.length <= 15; // Adjust length range as needed

    return phoneRegex.test(number) && lengthCheck;
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    if (value && !validatePhoneNumber(value)) {
      setError("Wrong phone formatting. Please use the correct format (e.g., +1 201-555-5555).");
    } else {
      setError("");
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePhoneNumber(phoneNumber)) {
      setError('');
      // Proceed with form submission or further processing
      console.log("Valid phone number:", phoneNumber);
      console.log("Selected gender:", gender);
    } else {
      setError("Wrong phone formatting. Please use the correct format (e.g., +1 201-555-5555).");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-4 lg:flex-row items-center lg:justify-between gap-10 w-full max-w-[1280px]">
      <div className="flex flex-col gap-10 w-full max-w-[519px]">
        <h1 className="text-5xl">Why join the Matchmaker AI?</h1>
        <p className="text-base text-primary italic">
          If you value precision, efficiency, and cherish your time, joining our
          platform is the perfect fit for you. As a member, you{'&apos'}ll experience
          heightened accuracy, faster connections, and an elevated caliber of
          matches.
        </p>
        <p className="text-base">
          Members contribute to our goal of maintaining Matchmaker AI as a
          discerning and top-tier dating and social networking hub. Our
          community encompasses individuals of various backgrounds, ages,
          orientations, and educational achievements, united by their ambition
          and determination to succeed. Naturally, they seek partners who share
          these qualities. Is there a quest more vital in life? We doubt it.
          Certain pursuits demand meticulous attention, and we firmly believe
          that optimizing your chances of finding The One is an investment in
          yourself that{'&apos'}s truly invaluable.
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-between md:p-14 p-4 bg-itemBackground border border-borderColor rounded-2xl w-full max-w-[640px]">
        <div className="flex flex-col lg:flex-row w-full justify-between gap-7">
          <div className="h-16 min-w-[230px] flex justify-center items-center gap-3 py-2 px-14 bg-secondaryBtn border rounded-lg">
            <input
              className="w-6 h-6 custom-radio"
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={handleGenderChange}
            />
            <span>Female</span>
          </div>
          <div className="h-16 min-w-[230px] flex justify-center items-center gap-3 py-2 px-14 bg-secondaryBtn border rounded-lg">
            <input
              className="w-6 h-6 custom-radio"
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={handleGenderChange}
            />
            <span>Male</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-base">First name</span>
          <input
            className="border bg-secondaryBtn rounded-lg px-6 py-5"
            type="text"
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base">Phone number</span>
          <div className="flex justify-start gap-2 px-6 py-5 border bg-secondaryBtn rounded-lg">
            {"+1 "} 
            <Input
              className="bg-secondaryBtn w-full border-none focus:outline-none"
              country="US"
              international
              placeholder="201-555-5555"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </div>

        <button className="w-full bg-primary py-5 px-10 rounded-lg text-primaryBtn">Submit</button>
      </div>
    </form>
  );
};

export default Form;