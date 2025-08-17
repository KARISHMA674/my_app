// src/components/AppNavbar.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiCloud, FiMenu, FiX, FiHome, FiBookOpen, FiFileText, FiBook } from "react-icons/fi";

// Styled Components
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  z-index: 1000;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const LogoIcon = styled.div`
  padding: 0.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    background-color: rgba(59, 130, 246, 0.08);
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: #4b5563;
  border: none;
  background: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(229, 231, 235, 0.5);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    background-color: rgba(59, 130, 246, 0.08);
  }
`;

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: <FiHome /> },
    { name: "Learning", href: "/learning", icon: <FiBookOpen /> },
    { name: "Assignment", href: "/assignment", icon: <FiFileText /> },
    { name: "Resources", href: "/resources", icon: <FiBook /> },
  ];

  return (
    <Navbar>
      <NavContainer>
        <NavContent>
          <LogoContainer onClick={() => (window.location.href = "/my_app/")}>
            <LogoIcon>
              <FiCloud color="white" size={24} />
            </LogoIcon>
            <LogoText>CloudLearn</LogoText>
          </LogoContainer>

          {isDesktop ? (
            <DesktopMenu>
              {navItems.map((item) => (
                <NavItem key={item.name} href={item.href}>
                  {item.icon}
                  {item.name}
                </NavItem>
              ))}
            </DesktopMenu>
          ) : (
            <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </MobileMenuButton>
          )}
        </NavContent>

        {!isDesktop && (
          <MobileMenu isOpen={isMenuOpen}>
            {navItems.map((item) => (
              <MobileNavItem
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </MobileNavItem>
            ))}
          </MobileMenu>
        )}
      </NavContainer>
    </Navbar>
  );
}
