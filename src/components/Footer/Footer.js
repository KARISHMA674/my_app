import React from "react";
import styled from "styled-components";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #6f6f71ff, #615f62ff);
  color: white;
  padding: 3rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterCol = styled.div`
  flex: 1;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 0.95rem;

    &:hover {
      color: #ffd369;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: white;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
      color: #ffd369;
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  font-size: 0.85rem;
  color: #ddd;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterCol>
          <FooterTitle>CloudLearn</FooterTitle>
          <p>
            Learn cloud computing with interactive lessons, quizzes, and
            real-world examples to prepare for your career.
          </p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin size={20} />
            </a>
          </SocialLinks>
        </FooterCol>

        <FooterCol>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterList>
            <li><a href="/">Home</a></li>
            <li><a href="/learning">Learning</a></li>
            <li><a href="/assignment">Assignments</a></li>
            <li><a href="/resources">Resources</a></li>
          </FooterList>
        </FooterCol>

        <FooterCol>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Email: support@cloudlearn.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: New Delhi, India</p>
        </FooterCol>
      </FooterTop>

      <FooterBottom>
        &copy; {new Date().getFullYear()} CloudLearn. All rights reserved.
      </FooterBottom>
    </FooterContainer>
  );
}
