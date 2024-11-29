import React from "react";
import UserNavbar from "../UserNavbar/UserNavbar";
import "./index.css";

function JobSeekerHome() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = userInfo ? userInfo.username : null;

  return (
    <div className="jobseeker-home-page">
      <UserNavbar />
      <div className="jobseeker-home-page-container">
        <section>
          <h1 className="blue-heading">{userName ? `Welcome, ${userName}!` : "Welcome to CareerGuru Job Seeker Portal"}</h1>
          <p>
            Discover a world of opportunities tailored just for you. CareerGuru is your go-to platform for connecting with top employers and finding the perfect job to match your skills, interests, and goals. Take the next step in your career journey today!
          </p>
        </section>

        <section>
          <h2 className="blue-heading">What Makes CareerGuru Unique?</h2>
          <p>
            At CareerGuru, we’re committed to redefining how you search for jobs. Our platform offers:
          </p>
          <ul>
            <li><strong>Extensive Job Listings:</strong> Find roles across industries, from startups to Fortune 500 companies.</li>
            <li><strong>Customized Recommendations:</strong> Let our smart filters and AI match you with roles that fit your profile.</li>
            <li><strong>Seamless Applications:</strong> Upload your resume once and apply to multiple jobs with just a click.</li>
            <li><strong>Real-Time Updates:</strong> Stay informed with instant notifications about new listings and application statuses.</li>
            <li><strong>Career Resources:</strong> Access expert advice, resume tips, and interview preparation guides.</li>
          </ul>
        </section>

        <section>
          <h2 className="blue-heading">Your Career Journey Starts Here</h2>
          <p>
            Whether you're exploring new opportunities or advancing your career, CareerGuru is here to help. Start browsing jobs, set up alerts, and connect with recruiters who value your talent. Join our community and unlock your potential!
          </p>
        </section>
      </div>
    </div>
  );
}

export default JobSeekerHome;
