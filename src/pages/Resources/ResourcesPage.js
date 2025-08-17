import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  ExternalLink,
  Book,
  Cloud,
  Video,
  FileText,
  Star,
  Users,
  Clock,
  Download,
} from "lucide-react";

// --- Animations ---
const pulse = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #581c87, #0f172a);
  position: relative;
  overflow: hidden;
  padding: 3rem 1.5rem;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  mix-blend-mode: multiply;
  animation: ${pulse} 6s infinite;
`;

const Circle1 = styled(BackgroundCircle)`
  top: -10rem;
  right: -10rem;
  width: 20rem;
  height: 20rem;
  background: #a855f7;
`;

const Circle2 = styled(BackgroundCircle)`
  bottom: -10rem;
  left: -10rem;
  width: 20rem;
  height: 20rem;
  background: #06b6d4;
  animation-delay: 2s;
`;

const Circle3 = styled(BackgroundCircle)`
  top: 50%;
  left: 50%;
  width: 20rem;
  height: 20rem;
  background: #ec4899;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
  opacity: 0.1;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(to right, white, #e9d5ff, #bae6fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.25rem;
    color: #cbd5e1;
    max-width: 600px;
    margin: 0.5rem auto 0;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  transition: all 0.3s;
  background: ${({ active }) =>
    active ? "white" : "rgba(255, 255, 255, 0.1)"};
  color: ${({ active }) => (active ? "#0f172a" : "white")};
  box-shadow: ${({ active }) =>
    active ? "0 0 20px rgba(255, 255, 255, 0.25)" : "none"};

  &:hover {
    background: ${({ active }) =>
      active ? "white" : "rgba(255, 255, 255, 0.2)"};
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const CardWrapper = styled.div`
  position: relative;
  transition: all 0.5s;
  &:hover {
    transform: translateY(-0.5rem);
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: ${({ color }) => `linear-gradient(to right, ${color})`};
  filter: blur(30px);
  opacity: 0;
  transition: all 0.5s;
  ${CardWrapper}:hover & {
    opacity: 0.3;
    transform: scale(1.05);
  }
`;

const Card = styled.a`
  position: relative;
  display: block;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  height: 100%;
  transition: all 0.5s;
  color: white;
  text-decoration: none;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const IconWrapper = styled.div`
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: ${({ color }) => `linear-gradient(to right, ${color})`};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
  transition: all 0.3s;
  ${Card}:hover & {
    background: linear-gradient(to right, white, #e9d5ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 1rem;

  span {
    color: white;
  }
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ color }) => `linear-gradient(to right, ${color})`};
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const AccessIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  animation: ${bounce} 1.5s infinite;
  font-size: 0.875rem;
`;

export default function ModernResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: "all", name: "All Resources", icon: Star },
    { id: "cloud", name: "Cloud Computing", icon: Cloud },
    { id: "documentation", name: "Documentation", icon: Book },
    { id: "courses", name: "Courses", icon: Video },
  ];

  const resources = [
    {
      title: "Cloud Computing Fundamentals",
      description:
        "Comprehensive guide covering cloud architecture, deployment models, and best practices for modern applications.",
      link: "https://docs.google.com/document/d/1Nl2RudAETbOvTbgKBS38vdKEfsiVel5GRVh-TlevFJM/edit?usp=sharing",
      category: "cloud",
      type: "PDF",
      icon: FileText,
      rating: 4.8,
      users: "12.5k",
      duration: "45 min read",
      color: "#3b82f6, #06b6d4",
    },
    {
      title: "AWS Documentation Hub",
      description:
        "Complete AWS service documentation with examples, tutorials, and architectural guidance for cloud solutions.",
      link: "https://docs.aws.amazon.com",
      category: "documentation",
      type: "Documentation",
      icon: Cloud,
      rating: 4.9,
      users: "2.1M",
      duration: "Reference",
      color: "#f97316, #ef4444",
    },
    {
      title: "Azure Learning Pathway",
      description:
        "Structured learning modules for Microsoft Azure, from fundamentals to advanced cloud architecture patterns.",
      link: "https://learn.microsoft.com/en-us/training/azure/",
      category: "courses",
      type: "Interactive",
      icon: Video,
      rating: 4.7,
      users: "890k",
      duration: "Self-paced",
      color: "#a855f7, #6366f1",
    },
    {
      title: "Google Cloud Training",
      description:
        "Professional cloud training with hands-on labs, certification prep, and real-world project experience.",
      link: "https://cloud.google.com/training",
      category: "courses",
      type: "Training",
      icon: Video,
      rating: 4.8,
      users: "650k",
      duration: "Various",
      color: "#22c55e, #10b981",
    },
    
    
  ];

  const filteredResources =
    activeCategory === "all"
      ? resources
      : resources.filter((resource) => resource.category === activeCategory);

  return (
    <PageWrapper>
      <Circle1 />
      <Circle2 />
      <Circle3 />

      <Content>
        <Header>
          <h1>Learning Resources</h1>
          <p>
            Discover cutting-edge resources to accelerate your cloud computing
            journey
          </p>
        </Header>

        <CategoryContainer>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <CategoryButton
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                <Icon size={18} />
                {category.name}
              </CategoryButton>
            );
          })}
        </CategoryContainer>

        <ResourceGrid>
          {filteredResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <CardWrapper
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardGlow color={resource.color} />
                <Card
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardHeader>
                    <IconWrapper color={resource.color}>
                      <Icon size={24} color="white" />
                    </IconWrapper>
                    <ExternalLink size={20} color="rgba(255,255,255,0.6)" />
                  </CardHeader>

                  <Title>{resource.title}</Title>
                  <Description>{resource.description}</Description>

                  <Stats>
                    <div>
                      <Star size={12} color="#facc15" fill="#facc15" />{" "}
                      <span>{resource.rating}</span>
                    </div>
                    <div>
                      <Users size={12} /> {resource.users}
                    </div>
                    <div>
                      <Clock size={12} /> {resource.duration}
                    </div>
                  </Stats>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <TypeBadge color={resource.color}>{resource.type}</TypeBadge>
                    {hoveredCard === index && (
                      <AccessIndicator>
                        <Download size={16} /> Access
                      </AccessIndicator>
                    )}
                  </div>
                </Card>
              </CardWrapper>
            );
          })}
        </ResourceGrid>
      </Content>
    </PageWrapper>
  );
}
