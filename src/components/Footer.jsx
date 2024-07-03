import React from "react";

const Footer = () => {
  return (
    <div className="mt-8">
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">privacy</a>
        </nav>
        <aside>
          <p>
            Copyright © 2024 - All right reserved by
            <span className="text-light-blue-300 font-bold ms-1">
              Nourhan Mahmoud
            </span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
