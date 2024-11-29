import React from "react";
import Navbar from "../Navbar/navbar";
import "./index.css";

function RecruiterHome() {
  const recruiterInfo = JSON.parse(localStorage.getItem("recruiterInfo"));
  const recruiterName = recruiterInfo ? recruiterInfo.username : null;

  return (
    <div className="recruiter-home-page">
      <Navbar />
      <div className="recruiter-home-page-container">
        <section>
          <h1 className="green-heading">
            {recruiterName ? `Welcome, ${recruiterName}!` : "Welcome to CareerVault Recruiter Portal"}
          </h1>
          <p>
            At CareerVault, we know the value of exceptional talent. Our platform empowers you to discover, connect, and hire the best professionals effortlessly. Simplify your recruitment process and build the team of your dreams today!
          </p>
        </section>

        <section>
          <h2 className="green-heading">Why Partner with CareerVault?</h2>
          <p>
            CareerVault is more than just a hiring platform—it’s your gateway to a smarter and faster recruitment process. Here's why recruiters trust us:
          </p>
        </section>

        <section>
          <h2 className="green-heading">Exclusive Features for Recruiters:</h2>
          <ul>
            <li><strong>Diverse Talent Pool:</strong> Access candidates across industries and experience levels.</li>
            <li><strong>Advanced Filters:</strong> Pinpoint the perfect fit with precision using our robust search and filter tools.</li>
            <li><strong>Easy Job Posting:</strong> Create job listings in minutes with our intuitive interface.</li>
            <li><strong>Real-Time Notifications:</strong> Stay updated on applications and candidate responses instantly.</li>
            <li><strong>Team Collaboration:</strong> Share, review, and make hiring decisions with your team seamlessly.</li>
          </ul>
        </section>

        <section>
          <h2 className="green-heading">Start Hiring with Confidence</h2>
          <p>
            CareerVault is here to make your hiring experience productive and hassle-free. Whether you're a small business or a large enterprise, we provide tools to meet your recruitment needs. Sign up today and find the talent that will elevate your organization!
          </p>
        </section>
      </div>
    </div>
  );
}

export default RecruiterHome;
