// ============================================================
// PORTFOLIO DATA REGISTRY
// All assets are in /public/assets/ and served at /assets/...
// To add new items, simply add entries to the arrays below.
// ============================================================

// ---- PERSONAL INFO ----
export const personalInfo = {
  name: "Mohamed Younus M A K",
  roles: [
    "Aspiring Python Developer",
    "Skilled in Python Programming & Artificial Intelligence",
    "Internship Seeker",
    "Tech Enthusiast",
    "Lifelong Learner"
  ],
  email: "mohamedyounus0572@gmail.com",
  phone: "+91 82483 31804",
  github: "https://github.com/MohamedYounus05",
  linkedin: "https://www.linkedin.com/in/mohamed-younus05",
  instagram: "https://www.instagram.com/_mohamed_younus_05?igsh=aTR3bmZkZzQ0M3Vm",
  location: "Tamil Nadu, India",
  objective:
    "A passionate technology enthusiast and fresher with hands-on knowledge of Python, Java, C++, and SQL, combined with a strong interest in logical thinking and efficient problem-solving. Comfortable balancing structured coding practices with creative approaches to build clean, practical solutions. Alongside technical skills, I bring adaptability, a continuous learning mindset, and effective communication abilities, enabling me to contribute effectively in collaborative and fast-paced environments.",
  education: [
    {
      institution: "Bishop Heber College",
      degree: "Bachelor of Computer Application (BCA)",
      duration: "2023 – 2026",
      location: "Trichy, India",
      details: "CGPA: 8.80 — Focus on computer application structures, database architectures, and object-oriented paradigms."
    },
    {
      institution: "Trinity Academy Senior Sec School",
      degree: "Senior Secondary (High School)",
      duration: "2019 – 2023",
      location: "Tiruvarur, India",
      details: "Percentage: 75% — Foundation in mathematics and computer science."
    }
  ],
  experience: [
    {
      role: "Data Analyst Intern",
      company: "ILife Technologies",
      duration: "Sep – Oct 2025",
      details: [
        "Developed proficiency in Microsoft Excel, SQL, Power BI, and Python for data queries and analytics.",
        "Created client-facing analytical dashboards and resolved statistical problems.",
        "Enhanced understanding of complete data workflows in real-world business environments."
      ]
    }
  ]
};

// ---- HEADLINE TICKER ----
export const headlines = [
  "Python Developer",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Analyst",
  "Internship Seeker",
  "Tech Enthusiast",
  "Lifelong Learner",
  "Problem Solver",
  "Always Learning",
  "Python Programming",
  "AI Enthusiast",
  "Data Analytics"
];

// ---- TECH ARSENAL (real skills only) ----
export const skillCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: "⚙️",
    skills: ["Python", "Java", "C", "C++", "SQL", "VB.Net"]
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "🎨",
    skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"]
  },
  {
    id: "backend",
    title: "Backend & Databases",
    icon: "🗄️",
    skills: ["Django", "MySQL"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "🤖",
    skills: ["Artificial Intelligence", "Machine Learning", "Generative AI", "Prompt Engineering"]
  },
  {
    id: "iot",
    title: "IoT & Hardware",
    icon: "📡",
    skills: ["IoT", "ESP32", "Sensors", "Embedded Systems"]
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: ["VS Code", "Microsoft Visual Studio", "Git", "GitHub", "Power BI", "Excel"]
  },
  {
    id: "systems",
    title: "Systems & Networking",
    icon: "🖥️",
    skills: ["Linux", "Windows", "Networking", "Cyber Security Fundamentals"]
  }
];

// ---- PROJECTS ----
export const projectsData = [
  {
    id: "scanspark-qr",
    title: "ScanSpark QR",
    category: "Python Application",
    description: "A QR code scanner and generator that allows users to create, scan, and manage QR codes through a simple and intuitive interface.",
    techStack: ["Python", "OpenCV", "QR Code"],
    github: "https://github.com/MohamedYounus05/scan-spark-QR",
    image: "/assets/projects/scan_spark.png",
    demo: "Coming Soon"
  },
  {
    id: "password-analyzer",
    title: "Password Strength Analyzer",
    category: "Machine Learning • Cyber Security",
    description: "A machine learning-based password strength analyzer that evaluates password security, predicts password strength, and provides recommendations for creating stronger passwords.",
    techStack: ["Python", "Machine Learning"],
    github: "https://github.com/MohamedYounus05/password_analyzer_py-ML",
    image: "/assets/projects/password_analyzer.png",
    demo: "Coming Soon"
  },
  {
    id: "face-recognition-attendance",
    title: "Face Recognition Attendance System",
    category: "Artificial Intelligence",
    description: "An AI-powered attendance management system that uses facial recognition to automatically identify users and record attendance in real time.",
    techStack: ["Python", "OpenCV", "Artificial Intelligence"],
    github: "https://github.com/MohamedYounus05/Face_recognition_attendance_py-AI",
    image: "/assets/projects/face_recognition.png",
    demo: "Coming Soon"
  },
  {
    id: "library-management",
    title: "Library Management System",
    category: "Django Web Application",
    description: "A complete library management system built with Django for managing books, members, borrowing, returns, and administrative operations through a clean web interface.",
    techStack: ["Django", "Python", "MySQL"],
    github: "https://github.com/MohamedYounus05/Library-Management-system-using-Django",
    image: "/assets/projects/library_management.png",
    demo: "Coming Soon"
  },
  {
    id: "iot-hydroponics",
    title: "IoT Hydroponics System",
    category: "IoT • Embedded Systems",
    description: "An IoT-enabled hydroponics system that monitors pH, temperature, humidity, and water levels in real time using sensors and a microcontroller to automate smart farming.",
    techStack: ["C++", "IoT", "Embedded Systems", "Sensors"],
    github: "https://github.com/MohamedYounus05/IOT-hydroponics-system",
    image: "/assets/projects/iot_hydroponics.png",
    demo: "Coming Soon"
  }
];

// ---- CERTIFICATES (manual registry – URL paths to /public/assets) ----
export const certificates = [
  { id: "ibm-ai", title: "IBM AI Fundamentals", issuer: "IBM", categories: ["AI"], src: "/assets/certificates/IBM AI FUNDAMENTAL.jpg" },
  { id: "intro-modern-ai-cert", title: "Introduction to Modern AI", issuer: "Great Learning", categories: ["AI"], src: "/assets/certificates/Introduction_to_Modern_AI_certificate_.jpg" },
  { id: "intro-modern-ai", title: "Introduction to Modern AI", issuer: "Great Learning", categories: ["AI"], src: "/assets/certificates/IntrotoModernAI.jpg" },
  { id: "mets-python", title: "Python Programming", issuer: "METS", categories: ["Programming"], src: "/assets/certificates/METS-PYTHON certificate.jpeg" },
  { id: "tata-genai", title: "GenAI Virtual Experience", issuer: "TATA", categories: ["AI"], src: "/assets/certificates/TATA GenAi.jpg" },
  { id: "great-learning-java", title: "Java Programming", issuer: "Great Learning", categories: ["Programming"], src: "/assets/certificates/certificate-great learning.PNG" },
  { id: "google-gemini", title: "Gemini Student Certification", issuer: "Google", categories: ["AI"], src: "/assets/certificates/google certificate.jpg" },
  { id: "infosys-python", title: "Basics of Python", issuer: "Infosys", categories: ["Programming"], src: "/assets/certificates/infosys certificate.jpg" },
  { id: "deloitte-cyber", title: "Cybersecurity Job Simulation", issuer: "Deloitte", categories: ["Cyber Security"], src: "/assets/certificates/delloite/Deloitte cyber job.jpg" },
  { id: "deloitte-data", title: "Data Analytics Experience", issuer: "Deloitte", categories: ["AI"], src: "/assets/certificates/delloite/Deloitte-data analytics certificate.jpg" },
  { id: "deloitte-tech", title: "Technology Virtual Experience", issuer: "Deloitte", categories: ["Cyber Security"], src: "/assets/certificates/delloite/delitte-Technology certificate.jpg" },
  { id: "hp-ai-beginners", title: "AI for Beginners", issuer: "HP Life", categories: ["AI"], src: "/assets/certificates/hp certficate/AI for Beginners_.jpg" },
  { id: "hp-ai-business", title: "AI for Business Professionals", issuer: "HP Life", categories: ["AI"], src: "/assets/certificates/hp certficate/AI for Business Professionals_.jpg" },
  { id: "tcs-career", title: "Career Edge – Young Professional", issuer: "TCS iON", categories: ["Cloud"], src: "/assets/certificates/Tcs ion/Mohamed_Younus_Career Edge.jpg" },
  { id: "tcs-comm", title: "Business Communication Skills", issuer: "TCS iON", categories: ["Cloud"], src: "/assets/certificates/Tcs ion/Mohamed_Younus_Communication skills.jpg" },
  { id: "tcs-yuav", title: "YUAV AI Certification", issuer: "TCS iON", categories: ["AI"], src: "/assets/certificates/Tcs ion/Mohamed_Younus_YUAV Ai.jpg" },
  { id: "tcs-young", title: "Young Professional Certificate", issuer: "TCS iON", categories: ["Cloud"], src: "/assets/certificates/Tcs ion/Mohamed_Younus_Young professional.jpg" },
  { id: "udemy-genai", title: "Generative AI Masterclass", issuer: "Udemy", categories: ["AI"], src: "/assets/certificates/udemy/Generative AI.jpg" },
  { id: "udemy-fullstack", title: "Full-Stack Web Development Bootcamp", issuer: "Udemy", categories: ["Programming"], src: "/assets/certificates/udemy/udemy-full stack_.jpg" },
  { id: "udemy-chatgpt", title: "Presentations with ChatGPT & AI", issuer: "Udemy", categories: ["AI"], src: "/assets/certificates/udemy/udemy-presentation with chatgpt_.jpg" },
  { id: "ilife-intern", title: "Data Analyst Intern Certificate", issuer: "ILife Technologies", categories: ["Internships"], src: "/assets/certificates/ILife certificate.jpg" }
];

// ---- ACHIEVEMENTS (manual registry) ----
export const achievements = [
  { id: "nat-quiz", title: "National Info-Tech Quiz", description: "Excelled in a nationwide competition testing deep knowledge of computing, databases, and network protocols.", src: "/assets/achievements/National info-tech Quiz_.jpg", icon: "Trophy" },
  { id: "it-wizard", title: "IT Wizard Championship", description: "Conferred with the IT Wizard title for outstanding logical problem-solving and software design.", src: "/assets/achievements/IT wizard certificate_.jpg", icon: "Zap" },
  { id: "symposium", title: "Academic Excellence Award", description: "Awarded the Certificate of Merit for securing Academic Topper during the V Semester of the BCA program at Bishop Heber College, recognizing outstanding academic performance and consistent excellence.", src: "/assets/achievements/academic-excellence-award.jpg", icon: "Medal" },
  { id: "ach-1", title: "Academic Achievement Award", description: "Awarded at collegiate levels for research showcase and cybersecurity mock tasks.", src: "/assets/achievements/IMG_20260221_133645.jpg", icon: "Medal" },
  { id: "ach-2", title: "Academic Achievement Award", description: "Recognized for exceptional performance in technical competitions and events.", src: "/assets/achievements/IMG_20260310_161418.png.jpg", icon: "Medal" },
  { id: "ach-3", title: "Human Chain Formation", description: "Awarded a Certificate of Appreciation by Kauvery Hospital for participating in the Human Chain Formation awareness program held on World Heart Day.", src: "/assets/achievements/IMG_20260313_195038.jpg", icon: "Medal" },
  { id: "ach-4", title: "Robo Sphere", description: "Participated in the Robo Sphere technical event, demonstrating innovation, teamwork, and practical problem-solving skills in robotics and technology.", src: "/assets/achievements/IMG_20260313_200300.png", icon: "Medal" },
  { id: "ach-5", title: "College Merit Recognition", description: "Received recognition from Bishop Heber College for outstanding academic performance and overall contribution to the department.", src: "/assets/achievements/IMG_20260313_194838.png", icon: "Medal" }
];
