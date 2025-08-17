import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Components
const Hero = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
`;

const HeroContent = styled.div`
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 1s ease forwards;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  animation: ${fadeInUp} 1s ease 0.3s both;
`;

const CtaButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeInUp} 1s ease 0.6s both;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
  }
`;

const HeroAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Cloud = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  animation: ${float} 6s ease-in-out infinite;
`;

const Cloud1 = styled(Cloud)`
  width: 100px;
  height: 40px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
`;

const Cloud2 = styled(Cloud)`
  width: 80px;
  height: 30px;
  top: 40%;
  right: 15%;
  animation-delay: 2s;
`;

const Cloud3 = styled(Cloud)`
  width: 120px;
  height: 50px;
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
`;

// Component
export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <Hero id="home">
      <HeroContent>
        <HeroTitle>Master Cloud Computing</HeroTitle>
        <HeroSubtitle>
          Learn the fundamentals of cloud technology with interactive lessons and practical examples
        </HeroSubtitle>
        <CtaButton onClick={() => navigate("/my_app/learning/")}>
          Start Learning
        </CtaButton>
      </HeroContent>

      <HeroAnimation>
        <Cloud1 />
        <Cloud2 />
        <Cloud3 />
      </HeroAnimation>
    </Hero>
  );
}
