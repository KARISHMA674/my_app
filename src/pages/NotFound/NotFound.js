import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
  color: #667eea;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
`;

const HomeButton = styled(Link)`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <Title>404</Title>
      <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
      <HomeButton to="/">Go Back Home</HomeButton>
    </NotFoundWrapper>
  );
}
