export interface ProjectDefinition {
  id: string;
  title: string;
  overview: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  demo?: string;
}

export const projects: ProjectDefinition[] = [
  {
    id: "ai-portal",
    title: "AI Student Portal",
    overview: "A full-stack academic assistant with NLP summarization, plagiarism detection, and a responsive portal experience.",
    problem: "Academic teams need fast, reliable feedback on essays and insight into integrity risks without manual review.",
    solution: "Built a Flask + React system that ingests student submissions, summarizes content, flags similarity risks, and surfaces actionable reports in a polished dashboard.",
    tech: ["Python", "Flask", "React", "NLP", "Azure SQL"],
    impact: "Accelerated review cycles for educators, improved academic honesty, and demonstrated end-to-end AI product delivery.",
    demo: "https://your-ai-portal-demo.vercel.app",
  },
  {
    id: "deepfake",
    title: "Deepfake Detection System",
    overview: "A real-world misuse detection engine using CNNs and OpenCV to identify manipulated video frames in production-like settings.",
    problem: "Deepfake misuse can damage trust, so teams need automated detection before content reaches audiences.",
    solution: "Developed a vision pipeline that extracts facial features, evaluates authenticity with CNN confidence scores, and logs suspicious frames for review.",
    tech: ["Python", "OpenCV", "CNN", "Computer Vision", "NumPy"],
    impact: "Improved safety posture for multimedia systems by identifying manipulation patterns and enabling faster incident triage.",
  },
  {
    id: "gesture",
    title: "Gesture Recognition System",
    overview: "A live CV interface that translates hand gestures into contextual actions for hands-free interaction.",
    problem: "Touchless interfaces need reliable gesture decoding for seamless human-machine control in real time.",
    solution: "Built a real-time recognition layer using computer vision, tracking skeletal landmarks and mapping gestures to workflow triggers.",
    tech: ["JavaScript", "OpenCV", "WebRTC", "React", "ML"],
    impact: "Delivered an interactive proof-of-concept for intuitive gesture controls with strong recognition accuracy and fast feedback.",
  },
];
