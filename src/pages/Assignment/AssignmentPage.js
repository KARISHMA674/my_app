import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Trophy, RefreshCw, Zap, Cloud, Brain } from "lucide-react";

const quizData = {
  beginner: {
    title: "Beginner Quiz",
    icon: Cloud,
    gradient: "linear-gradient(to right, #60a5fa, #a78bfa)",
    questions: [
      { question: "What is cloud computing?", options: ["A type of weather", "Internet-based computing", "Desktop software", "None of these"], correct: "Internet-based computing" },
      { question: "Which is a cloud service model?", options: ["IaaS", "HTML", "CSS", "DNS"], correct: "IaaS" },
      { question: "Which company offers AWS?", options: ["Amazon", "Google", "Microsoft", "IBM"], correct: "Amazon" },
      { question: "Which is NOT a type of cloud?", options: ["Public", "Private", "Hybrid", "Green"], correct: "Green" },
      { question: "Which protocol is used for web communication?", options: ["HTTP", "FTP", "SMTP", "SSH"], correct: "HTTP" },
    ],
  },
  moderate: {
    title: "Moderate Quiz",
    icon: Zap,
    gradient: "linear-gradient(to right, #a78bfa, #ec4899)",
    questions: [
      { question: "What does SaaS stand for?", options: ["Software as a Service", "Server as a Service", "System as a Service", "Storage as a Service"], correct: "Software as a Service" },
      { question: "Which is a PaaS provider?", options: ["Heroku", "React", "Python", "Git"], correct: "Heroku" },
      { question: "Which storage is object-based?", options: ["Amazon S3", "MySQL", "MongoDB", "Dropbox"], correct: "Amazon S3" },
      { question: "Which is NOT a PaaS feature?", options: ["Runtime environment", "Data storage", "Networking", "Manual hardware setup"], correct: "Manual hardware setup" },
      { question: "Which tool is used for cloud monitoring?", options: ["CloudWatch", "Photoshop", "Excel", "Figma"], correct: "CloudWatch" },
    ],
  },
  advanced: {
    title: "Advanced Quiz",
    icon: Brain,
    gradient: "linear-gradient(to right, #ec4899, #f97316)",
    questions: [
      { question: "What is Kubernetes used for?", options: ["Container orchestration", "Website design", "File storage", "AI modeling"], correct: "Container orchestration" },
      { question: "What does CDN stand for?", options: ["Content Delivery Network", "Cloud Data Node", "Central Data Network", "Control Delivery Node"], correct: "Content Delivery Network" },
      { question: "Which is a cloud-native database?", options: ["Aurora", "MySQL", "Oracle DB", "PostgreSQL"], correct: "Aurora" },
      { question: "Which protocol secures HTTP?", options: ["HTTPS", "FTP", "SMTP", "SSH"], correct: "HTTPS" },
      { question: "What does IaC mean?", options: ["Infrastructure as Code", "Internet as Cloud", "Instance as Compute", "Information and Communication"], correct: "Infrastructure as Code" },
    ],
  },
};

// Animations
const blob = keyframes`
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f172a, #6b21a8, #0f172a);
  position: relative;
  overflow: hidden;
  color: white;
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: white;
  pointer-events: none;
  animation: pulse infinite;
`;

const GradientOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(48px);
  opacity: 0.2;
  animation: ${blob} 7s infinite;
`;

const Container = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: auto;
  padding: 6rem 1.5rem 3rem; /* top padding increased */
`;


const LevelButton = styled.button`
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  padding: 2rem;
  min-width: 280px;
  box-shadow: 0 10px 25px rgba(147, 51, 234, 0.25);
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  background: ${({ gradient }) => gradient};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(147, 51, 234, 0.5);
  }
`;

const QuestionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.2);
  background: ${({ correct, selected, feedback }) => {
    if (!feedback) return "rgba(255,255,255,0.05)";
    if (correct) return "rgba(34,197,94,0.2)";
    if (selected) return "rgba(239,68,68,0.2)";
    return "rgba(107,114,128,0.1)";
  }};
  color: ${({ correct, selected, feedback }) => {
    if (!feedback) return "white";
    if (correct) return "#86efac";
    if (selected) return "#fca5a5";
    return "#9ca3af";
  }};
  transition: transform 0.3s;

  &:hover {
    transform: ${({ feedback }) => (!feedback ? "scale(1.02)" : "none")};
  }
`;

const ResultCard = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 3rem;
  text-align: center;
  animation: ${fadeInUp} 0.6s ease-out;
`;

export default function ModernQuizApp() {
  const [level, setLevel] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const handleAnswer = (selected) => {
    setSelectedAnswer(selected);
    setShowFeedback(true);
    
    if (selected === quizData[level].questions[currentQ].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQ + 1 < quizData[level].questions.length) {
        setCurrentQ(currentQ + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setLevel(null);
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const getScoreGradient = () => {
    const percentage = (score / quizData[level].questions.length) * 100;
    if (percentage >= 80) return "linear-gradient(to right, #4ade80, #10b981)";
    if (percentage >= 60) return "linear-gradient(to right, #facc15, #f97316)";
    return "linear-gradient(to right, #f87171, #ec4899)";
  };

  return (
    <AppWrapper>
      {/* Background particles */}
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <GradientOrb style={{ top: 0, left: 0, width: "24rem", height: "24rem", background: "#a855f7" }} />
      <GradientOrb style={{ top: 0, right: 0, width: "24rem", height: "24rem", background: "#facc15", animationDelay: "2s" }} />
      <GradientOrb style={{ bottom: 0, left: "50%", width: "24rem", height: "24rem", background: "#ec4899", animationDelay: "4s" }} />

      <Container>
        {!level && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
            {Object.entries(quizData).map(([lvl, data]) => {
              const Icon = data.icon;
              return (
                <LevelButton key={lvl} gradient={data.gradient} onClick={() => setLevel(lvl)}>
                  <Icon size={48} style={{ marginBottom: "1rem" }} />
                  <h3 style={{ fontSize: "1.5rem" }}>{data.title}</h3>
                  <p>{data.questions.length} Questions</p>
                </LevelButton>
              );
            })}
          </div>
        )}

        {level && !showResult && (
          <QuestionCard>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              {quizData[level].questions[currentQ].question}
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {quizData[level].questions[currentQ].options.map((option) => (
                <OptionButton
                  key={option}
                  correct={option === quizData[level].questions[currentQ].correct}
                  selected={option === selectedAnswer}
                  feedback={showFeedback}
                  onClick={() => !showFeedback && handleAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </OptionButton>
              ))}
            </div>
          </QuestionCard>
        )}

        {showResult && (
          <ResultCard>
            <div style={{
              background: getScoreGradient(),
              padding: "1.5rem",
              borderRadius: "50%",
              display: "inline-block",
              marginBottom: "1rem"
            }}>
              <Trophy size={64} />
            </div>
            <h2>Quiz Completed!</h2>
            <p>{score} / {quizData[level].questions.length} correct</p>
            <button onClick={restartQuiz} style={{ padding: "1rem 2rem", borderRadius: "1rem", marginTop: "1.5rem", background: "#a855f7", color: "white", fontWeight: "bold" }}>
              <RefreshCw size={20} style={{ marginRight: "0.5rem" }} />
              Try Another Quiz
            </button>
          </ResultCard>
        )}
      </Container>
    </AppWrapper>
  );
}
