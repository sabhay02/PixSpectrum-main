import React, { useEffect, useState } from "react";
import ContributorPresenter from "../components/ContributorPresenter";
import Contributor from "./Contributor";
import SaanviPhoto from "../assets/Saanvi.jpeg";
import SaviturPhoto from "../assets/Savitur.jpeg";
import NamanPhoto from "../assets/Naman.jpeg";
import SabhayPhoto from "../assets/Sabhay.jpeg";

const listOfContributors = [
  new Contributor(
    SaviturPhoto,
    "Savitur Chauhan",
    "23UCC598",
    "https://www.linkedin.com/in/saviturchauhan",
    "https://github.com/SaviturChauhan",
    "Team Member" // Update with actual role
  ),
  new Contributor(
    NamanPhoto,
    "Naman Arora",
    "23UCC575",
    "https://www.linkedin.com/in/naman-arora-798852291/",
    "https://github.com/Naman-2208",
    "Team Member" // Update with actual role
  ),
  new Contributor(
    SabhayPhoto,
    "Sabhay Thakkar",
    "23UCC594",
    "https://www.linkedin.com/in/sabhay-thakkar-660b02291/",
    "https://github.com/sabhay02",
    "Team Member" // Update with actual role
  ),
  new Contributor(
    SaanviPhoto,
    "Saanvi Chabaque",
    "23UCC593",
    "https://www.linkedin.com/in/saanvi-chabaque-116060312/",
    "https://github.com/Schabaque",
    "Team Member" // Update with actual role
  ),
];

const AboutUsPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update the `isMobile` state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        padding: isMobile ? "24px 16px" : "40px",
        overflowY: "auto",
        textAlign: "left",
        height: "100%",
      }}
      className="bg-transparent"
    >
      <h2
        style={{
          fontSize: isMobile ? "2em" : "2.5em",
          color: "#1e293b",
          fontWeight: "bold",
          marginBottom: "16px",
          letterSpacing: "-0.02em",
        }}
      >
        Meet Our Team
      </h2>

      <p
        style={{
          color: "#64748b",
          marginBottom: "40px",
          fontSize: isMobile ? "0.95em" : "1.05em",
          lineHeight: "1.7",
          maxWidth: "800px",
        }}
      >
        We are a team formed for the Integrated Software Development Lab
        project, bringing together our diverse skills to achieve a common goal.
        Our collaboration has allowed us to learn from each other and apply our
        knowledge in practical scenarios, contributing to the successful
        completion of this project.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: isMobile ? "center" : "flex-start",
        }}
      >
        {listOfContributors.map((contributor, index) => (
          <ContributorPresenter key={index} contributor={contributor} />
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
