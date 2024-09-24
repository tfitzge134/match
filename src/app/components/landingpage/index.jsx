"use client";
import Head from 'next/head'; // Import Head from next/head
import Script from 'next/script'; // Import Script from next/script
import { useCallback, useEffect } from "react";
import WaitingList from "./waiting-list";
import Form from "./form";
import Cards from "./cards";
import Faq from "./faq";
import Footer from "./footer";
import VideoThumbnail from "../common/videoThumbnail";
import Input from "react-phone-number-input/input";
import Header from "./header";
import { useTheme } from 'next-themes';
import { db, verifyConnection } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

const LandingPage = () => {
  const { theme, setTheme } = useTheme();

  const [phoneNumber, setPhoneNumber] = useState(""); // State to manage phone number
  const [error, setError] = useState("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    console.log({ newTheme });
    handleTheme(newTheme);
  };

  const handleTheme = useCallback((value) => {
    setTheme(value);
    document.querySelector("html")?.setAttribute("data-theme", value);
  }, [setTheme]);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    handleTheme(currentTheme);
  }, [handleTheme]);

  // Verify connection to Firestore when the component mounts
  useEffect(() => {
    const checkConnection = async () => {
      await verifyConnection();
    };
    checkConnection();
  }, []);

  // Handler for phone number change
  const handlePhoneNumberChange = (value) => {
    console.log("Phone Number Changed:", value); // Debugging line
    if (value === undefined) {
      setPhoneNumber(""); // Reset state if input is cleared
    } else {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Form submitted"); // Debugging line
    console.log("Current Phone Number:", phoneNumber); // Debugging line

    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      console.log("Error: No phone number entered."); // Debugging line
      return;
    }

    try {
      // Add the phone number to the Firestore collection
      await addDoc(collection(db, 'phoneNumbers'), {
        phoneNumber,
      });
      setError("");
      setPhoneNumber(""); // Clear input after submission
      alert("Phone number submitted successfully!");
      console.log("Phone number submitted successfully!"); // Debugging line
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error submitting phone number.");
      console.log("Error submitting phone number:", error); // Debugging line
    }
  };

  return (
    <div className="bg-background">
      <Head>
        <title>Your Page Title</title>
      </Head>
      {/* Use next/script for loading Firebase scripts */}
      <Script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js" strategy="beforeInteractive" />
      <Script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-database.js" strategy="beforeInteractive" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <div className="ion-padding ">
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center justify-center gap-20 w-full max-w-[1280px]">
            <div className="flex flex-col items-center justify-center max-w-[739px] gap-10">
              <div className="px-4 text-center text-wrap">
                <h1 className="text-6xl">
                  Love sparked <br /> by an instant Connection
                </h1>
                <p className="text-lg">
                  Discover meaningful connection and ignite love through our
                  expert matching
                </p>
              </div>
              <div className="w-full flex flex-col gap-1 px-2">
                <span className="text-base">Phone number</span>
                <form onSubmit={handleSubmit} className="flex bg-secondaryBtn justify-between h-20 text-lg items-center p-2 rounded-lg">
                  <div className="flex bg-secondaryBtn justify-between h-20 text-lg items-center p-2 rounded-lg">
                    <div className="flex justify-start gap-2 p-4">
                      {"+1 "}
                      <Input
                        className="bg-secondaryBtn w-full border-none focus:outline-none"
                        country="US"
                        international
                        placeholder="201-555-5555"
                        value={phoneNumber} // Controlled input value
                        onChange={handlePhoneNumberChange} // Use the change handler
                      />
                    </div>
                    <button type="submit" className="hidden lg:block bg-primary text-primaryBtn rounded-lg py-5 px-10 min-w-[287px]">
                      APPLY FOR MEMBERSHIP
                    </button>
                  </div>
                  <button className="mt-6 bg-primary w-full lg:hidden text-base py-4 px-10 rounded-lg">
                    APPLY FOR MEMBERSHIP
                  </button>
                </form>
              </div>
            </div>
            <VideoThumbnail videoId={"LXb3EKWsInQ"} />
            <WaitingList />
            <Form />
            <Cards />
            <Faq />
            <div className="px-4">
              <div className="flex flex-col lg:flex-row justify-between items-center bg-secondaryBtn rounded-2xl gap-10 p-10 w-full max-w-[1280px]">
                <div className="flex flex-col gap-2 justify-center text-left">
                  <h1 className="text-5xl">Find Your Perfect Match Today!</h1>
                  <p className="text-base">
                    Join Matchmaking AI and discover meaningful connections
                    tailored to you.
                  </p>
                </div>
                <button className="bg-primary text-primaryBtn py-7 leading-5 px-10 w-full text-lg rounded-lg lg:w-[282px]">
                  ADVANCE POSITION
                </button>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;