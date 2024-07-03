import React from "react";

const ContactUs = () => {
  return (
    <div className="mt-[7em] flex justify-center flex-col items-center ">
      <div className="text-center">
        <h1 className="text-light-blue-300 font-bold mb-10 text-2xl">
          Contact with the website developer
        </h1>
      </div>
      <div className="flex justify-center w-[80%]">
        <form
          action=""
          className="flex flex-col p-5 items-baseline shadow-light-blue-500/50 shadow-md w-[26em] "
        >
          <label className="font-bold">Email Adress</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full mb-5"
          />
          <label className="font-bold">Your Subject</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full  mb-5"
          />
          <label className="font-bold">Your Message</label>
          <textarea
            className="textarea textarea-info mb-5 w-full"
            placeholder="Bio"
          ></textarea>
          <div className="w-full text-center">
            <button className="btn btn-outline btn-info w-[9em] mt-6">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
