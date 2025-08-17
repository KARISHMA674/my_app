import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LearningPage = () => {
  const [activeNote, setActiveNote] = useState(null);
  const navigate = useNavigate();

  const notes = [
  { 
    title: "Introduction to Cloud Computing", 
    content: "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, and analytics—over the internet (‘the cloud’). Instead of owning physical infrastructure, users rent resources from providers on-demand, enabling faster innovation, flexible scaling, and reduced costs."
  },
  { 
    title: "Core Advantages", 
    content: "Benefits include scalability to adjust resources as needed, cost-efficiency with pay-as-you-go pricing, global accessibility from any internet-enabled device, enhanced reliability with backups, and faster time-to-market for new products and services."
  },
  { 
    title: "Cloud Service Models", 
    content: "1) Infrastructure as a Service (IaaS) offers virtualized computing resources with control over operating systems. 2) Platform as a Service (PaaS) provides an environment for application development without managing infrastructure. 3) Software as a Service (SaaS) delivers ready-to-use apps via the web."
  },
  { 
    title: "Deployment Models", 
    content: "1) Public Cloud: shared infrastructure by third-party providers. 2) Private Cloud: dedicated resources for one organization. 3) Hybrid Cloud: mix of public and private environments. 4) Multi-Cloud: multiple providers for redundancy and flexibility."
  },
  { 
    title: "Virtualization in Cloud", 
    content: "Virtualization enables multiple virtual machines to run on a single physical server, improving hardware utilization and scalability. It underpins cloud resource allocation and isolation, ensuring efficient service delivery."
  },
  { 
    title: "Major Cloud Providers", 
    content: "Key players include Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), IBM Cloud, and Oracle Cloud. Each offers a wide range of services, pricing models, and global infrastructure coverage."
  },
  { 
    title: "Cloud Security Basics", 
    content: "Security in the cloud involves data encryption, access control, identity management, and compliance with regulations. Shared responsibility means providers secure the infrastructure while customers secure their applications and data."
  },
  { 
    title: "Common Cloud Applications", 
    content: "Examples include file storage (Google Drive, Dropbox), video conferencing (Zoom, Microsoft Teams), streaming services (Netflix), and business tools (Salesforce, Slack). These services highlight the versatility of cloud computing."
  },
  { 
    title: "Challenges in Cloud Computing", 
    content: "Potential issues include data privacy concerns, vendor lock-in, downtime risks, compliance requirements, and hidden costs. Organizations must weigh these factors before migration."
  },
  { 
    title: "Future Trends in Cloud Computing", 
    content: "Emerging trends include edge computing for reduced latency, AI-powered cloud services, serverless computing for cost savings, and sustainable cloud operations to minimize environmental impact."
  }
];


  return (
    <Container>
      {/* Top Buttons */}
      <ButtonRow>
        <ActionButton color="#6D28D9" onClick={() => navigate("/my_app/assignment/")}>
          Assignment
        </ActionButton>
        <ActionButton color="#0E7490" onClick={() => navigate("/my_app/resources/")}>
          Resources
        </ActionButton>
      </ButtonRow>

      {/* Main Content */}
      <Content>
        {/* Video */}
        <VideoWrapper>
          <iframe
            src="https://www.youtube.com/embed/2LaAJq1lB1Q"
            title="Cloud Computing Fundamentals"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </VideoWrapper>

        {/* Notes */}
        <Notes>
          {notes.map((note, index) => (
            <Note
              key={index}
              onClick={() => setActiveNote(activeNote === index ? null : index)}
            >
              <h3>{note.title}</h3>
              {activeNote === index && <p>{note.content}</p>}
            </Note>
          ))}
        </Notes>
      </Content>
    </Container>
  );
};

export default LearningPage;

/* ===== Styled Components ===== */
const Container = styled.div`
  padding: 60px 20px 20px; /* Added top padding */
  background: linear-gradient(to bottom right, #0f172a, #6b21a8, #0f172a);
  color: white;
  min-height: 100vh;
`;

const VideoWrapper = styled.div`
  flex: 2;
  position: relative;

  /* Desktop rectangular ratio */
  @media (min-width: 1024px) {
    padding-top: 40%; /* less height → more rectangular */
  }

  /* Tablet & mobile maintain 16:9 */
  @media (max-width: 1023px) {
    padding-top: 56.25%;
  }

  iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 8px;
  }
`;


const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ActionButton = styled.button`
  background: ${(props) => props.color};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;



const Notes = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Note = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    font-size: 0.85rem;
    margin-top: 5px;
    color: #d1d5db;
  }
`;
