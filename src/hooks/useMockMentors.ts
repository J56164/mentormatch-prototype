import mentor1Url from "../assets/mentor1.png";
import mentor2Url from "../assets/mentor2.png";
import mentor3Url from "../assets/mentor3.png";
import mentor4Url from "../assets/mentor4.png";

export function useMockMentors() {
  return [
    {
      id: 1,
      name: "สมชาย วงศ์ใหญ่",
      age: 68,
      title: "Senior Financial Advisor",
      experience: "30+ years in finance, banking, and investment",
      specialties: [
        "Financial Planning",
        "Investment Strategy",
        "Risk Management",
      ],
      bio: "Former bank executive with extensive experience in helping young professionals build wealth and plan for their future.",
      image: mentor1Url,
    },
    {
      id: 2,
      name: "ปราณี สุขใจ",
      age: 72,
      title: "Marketing Executive (Retired)",
      experience: "35+ years in marketing and brand management",
      specialties: ["Brand Strategy", "Digital Marketing", "Leadership"],
      bio: "Helped build several major Thai brands and now passionate about sharing knowledge with the next generation.",
      image: mentor2Url,
    },
    {
      id: 3,
      name: "วิชาญ เทคโนโลยี",
      age: 65,
      title: "Technology Consultant",
      experience: "40+ years in software development and IT management",
      specialties: [
        "Software Engineering",
        "Project Management",
        "Tech Leadership",
      ],
      bio: "Pioneer in Thailand's tech industry, mentored hundreds of engineers throughout career.",
      image: mentor3Url,
    },
    {
      id: 4,
      name: "สุวรรณา ธุรกิจ",
      age: 70,
      title: "Business Strategy Consultant",
      experience: "35+ years in business development and strategy",
      specialties: ["Business Planning", "Operations", "Team Leadership"],
      bio: "Former CEO with experience building companies from startups to established enterprises.",
      image: mentor4Url,
    },
  ];
}
