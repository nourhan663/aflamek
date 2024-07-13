import React, { useState } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "@material-tailwind/react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [masssege, setmessage] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const form = useRef();

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  const sendEmail = (e) => {
    e.preventDefault();

    const seriviceId = "service_3lk5kxh";
    const templeteId = "template_1y8gnhi";
    const publicKey = "CChT4BRf-1V2DV_8J";

    const templeteParams = {
      to_name: "Nourhan",
      from_name: name,
      from_email: email,
      message: masssege,
    };

    emailjs.send(seriviceId, templeteId, templeteParams, publicKey).then(
      () => {
        setAlert({
          show: true,
          message: "email sent.",
          type: "success",
        });

        setTimeout(() => {
          setAlert({ show: false, message: "", type: "" });
        }, 3000);
      },
      (error) => {
        setAlert({
          show: true,
          message: "Failed to send email.",
          type: "error",
        });

        setTimeout(() => {
          setAlert({ show: false, message: "", type: "" });
        }, 3000);
      }
    );
  };

  return (
    <div className="mt-[7em] flex justify-center flex-col items-center relative ">
      {alert.show && (
        <Alert
          icon={<Icon />}
          className={`rounded-none border-l-4 z-50 ${
            alert.type === "success"
              ? "border-[#2ec946] bg-[#2ec946]/10 text-[#2ec946] "
              : "border-red-500 bg-red-100 text-red-500"
          } font-medium  fixed top-16 z-[300]`}
        >
          {alert.message}
        </Alert>
      )}
      <div className="text-center">
        <h1 className="text-light-blue-300 font-bold mb-10 text-2xl">
          Contact with the website developer
        </h1>
      </div>
      <div className="flex justify-center w-[80%]">
        <form
          ref={form}
          action=""
          className="flex flex-col p-5 items-baseline shadow-light-blue-500/50 shadow-md w-[26em] rounded-xl"
          onSubmit={sendEmail}
        >
          <label className="font-bold">Name</label>
          <input
            name="user_name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-info w-full mb-5"
          />
          <label className="font-bold">Email Adress</label>
          <input
            type="email"
            name="user_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-info w-full  mb-5"
          />
          <label className="font-bold">Your Message</label>
          <textarea
            className="textarea textarea-info mb-5 w-full"
            name="message"
            value={masssege}
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Bio"
          ></textarea>
          <div className="w-full text-center">
            <button
              className="btn btn-outline btn-info w-[9em] mt-6"
              type="submit"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
