/**
 * Ednora Frontend Configuration
 * Contains all static content, images, headings, and branding
 * loaded directly by the frontend without relying on backend socket or API.
 */

export const EDNORA_LOGO_URL =
   'https://res.cloudinary.com/dpnc8ddpf/image/upload/v1793010964/030f5f9d-b9c7-4135-b37f-dedb90870eab_lgxmb0.png';

export const EDNORA_LOGO_LOCAL = '/logo.png';

const frontendConfig = {
   logo: {
      url: EDNORA_LOGO_URL,
      local: EDNORA_LOGO_LOCAL,
      alt: 'Ednora — Where Knowledge Finds Its Future',
   },

   landingPage: {
      HeroSection: {
         homeBackgroundImage: '/Home_bg.webp',
         homeTitle: 'Learn Today. Build Tomorrow.',
         homeParagraph:
            'At Ednora, learning goes beyond textbooks. We help students build strong technical skills, explore new ideas, solve real-world problems, and turn their curiosity into practical knowledge. Through hands-on learning, expert guidance, and project-based education, we prepare students for the opportunities of tomorrow.',
         primaryCTA: 'Explore Our Courses',
         secondaryCTA: 'Discover Ednora',
      },
      AboutSection: {
         Heading_First: 'Empowering Students to Shape the Future',
         Heading_Second: 'Empowering Students to Shape the Future',
         paragraph_First:
            'Ednora is a learning community focused on technology, innovation, and personal growth. We believe every student should have the opportunity to explore their interests, develop practical skills, and build the confidence to achieve their goals.',
         paragraph_Second:
            'Our learning approach combines academic foundations with hands-on projects, modern computing facilities, and guided mentorship. From understanding core concepts to building real applications, we encourage students to learn by doing and prepare for a rapidly changing digital world.',
         CTA: 'Learn More About Us',
         image_First: '/Rectangle_1.webp',
         image_Second: '/Rectangle-2.webp',
         image_Third: '/Rectangle.webp',
      },
      Mission_and_Goals_Info: {
         heading: 'The Values That Drive Us',
         introduction:
            'We believe meaningful education develops more than technical knowledge. It builds curiosity, responsibility, creativity, and the ability to work with others.',
      },
      Mission_and_Goals: [
         {
            title: 'Innovation',
            content:
               'We encourage students to explore emerging technologies, experiment with new ideas, and develop creative solutions to real-world challenges.',
            image: '/Bagpack.webp',
         },
         {
            title: 'Integrity',
            content:
               'We promote honesty, accountability, respect, and ethical decision-making in every aspect of learning and professional growth.',
            image: '/Knowledge.webp',
         },
         {
            title: 'Excellence',
            content:
               'We strive for continuous improvement through strong academic foundations, practical experience, and a commitment to quality.',
            image: '/Student.webp',
         },
         {
            title: 'Diversity',
            content:
               'We value different perspectives, backgrounds, and experiences, creating a learning environment where everyone has the opportunity to grow.',
            image: '/Clock.webp',
         },
         {
            title: 'Collaboration',
            content:
               'We encourage teamwork through group projects, coding activities, open-source contributions, and collaborative problem-solving.',
            image: '/Webinar.webp',
         },
         {
            title: 'Sustainability',
            content:
               'We inspire students to use technology responsibly and develop solutions that contribute to a smarter, more sustainable future.',
            image: '/Research.webp',
         },
      ],
   },

   aboutPage: {
      AboutHero: {
         image: '/About_Hero.webp',
         Heading:
            'Discover Your Potential. Develop Your Skills. Shape Your Future.',
         paragraph:
            'Every great achievement begins with curiosity and a willingness to learn. At Ednora, we create opportunities for students to explore technology, strengthen their knowledge, and develop the practical skills needed to turn ideas into meaningful outcomes.',
      },
      History: {
         title: 'Built Around Learning, Driven by Innovation',
         paragraph_First:
            'Ednora was established with a clear purpose: to make technical education relevant to the needs of a changing world. We believe students learn best when strong academic foundations are combined with practical experience and opportunities to explore.',
         paragraph_Second:
            'Our approach focuses on helping learners move beyond theory and understand how knowledge is applied in real situations. Through practical exercises, laboratory sessions, collaborative projects, and guided learning, students can develop skills that extend beyond the classroom.',
         paragraph_Third:
            'As technology continues to evolve, we recognize the importance of keeping learning relevant. We encourage curiosity, independent thinking, and continuous skill development so students can adapt to new challenges and opportunities.',
         paragraph_Four:
            'Our goal is to build a supportive learning environment where students can discover their strengths, develop their potential, and take confident steps toward their academic and professional aspirations.',
      },
      Vision_and_Mission: {
         title: 'Preparing Learners for a Changing World',
         vision_title: 'Our Vision',
         vision_text:
            'To create a learning environment where technology, creativity, and knowledge come together to empower the next generation of innovators, problem-solvers, and technology professionals.',
         mission_title: 'Our Mission',
         mission_text:
            'To provide accessible, practical, and relevant education that helps students develop strong technical foundations, professional skills, and the confidence to pursue their ambitions.',
         beliefs_title: 'What We Believe',
         beliefs: [
            'Learn by doing: Practical experience makes knowledge meaningful.',
            'Think critically: Asking questions leads to deeper understanding.',
            'Build together: Collaboration creates better ideas and stronger solutions.',
            'Keep growing: Continuous learning is essential in a world shaped by technology.',
            'Act responsibly: Knowledge should be used ethically and thoughtfully.',
         ],
         paragraph_First:
            'Our Vision: To create a learning environment where technology, creativity, and knowledge come together to empower the next generation of innovators, problem-solvers, and technology professionals.',
         paragraph_Second:
            'Our Mission: To provide accessible, practical, and relevant education that helps students develop strong technical foundations, professional skills, and the confidence to pursue their ambitions.',
         paragraph_Third:
            'What We Believe: Learn by doing, think critically, build together, keep growing, and act responsibly with knowledge.',
         paragraph_Four:
            'Continuous learning is essential in a world shaped by technology. We inspire students to innovate with purpose and integrity.',
      },
      LearningEnvironment: {
         heading: 'A Space to Learn, Create, and Grow',
         paragraph:
            'A great learning environment supports both academic progress and personal development. Ednora aims to provide spaces and resources that encourage focused study, practical experimentation, collaboration, and creativity. From technology-enabled classrooms to hands-on computing facilities, the goal is to help students learn effectively and put their knowledge into practice.',
      },
      Description: {
         image: '/Knowledge.webp',
         heading: 'Facilities Designed Around Student Growth',
         paragraph:
            'The right environment can make learning more engaging and productive. Explore the facilities designed to support academic learning, practical skill development, student well-being, and campus life.',
         price: 'Campus Facilities',
         room: 'Student Spaces',
      },
      FacilitiesSection: {
         heading: 'Facilities Designed Around Student Growth',
         introduction:
            'The right environment can make learning more engaging and productive. Explore the facilities designed to support academic learning, practical skill development, student well-being, and campus life.',
      },
      Facilities: [
         {
            title: 'Advanced Computer Labs',
            Heading: 'Learn Technology Through Practice',
            description:
               'Build practical computing skills in dedicated laboratory environments designed for programming, software development, database practice, and technical experimentation. These spaces help students apply classroom concepts, explore development tools, and work on practical assignments.',
            image: 'https://imgs.search.brave.com/TpWi1gCy0AJYm6OHo-l4GKIFpBs3C0a3sTRDXwAPOQQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmVz/aWRlbmN5dW5pdmVy/c2l0eS5pbi9hc3Nl/dHMvaW1hZ2VzL2Nv/bXB1dGVyLWxhYnMt/aW1nXzIud2VicA',
            highlight: '6 Modern Labs',
            Number: '6 Modern Labs',
            price: 'Academic Lab',
            room: 'Lab 1 - 6',
         },
         {
            title: 'Digital Classrooms',
            Heading: 'A More Engaging Learning Experience',
            description:
               'Technology-enabled classrooms support interactive teaching, multimedia presentations, and collaborative learning. They provide opportunities for students to engage with concepts, participate in discussions, and learn through different teaching methods.',
            image: 'https://imgs.search.brave.com/wmFh8bTS7tWzn4moQ0E2UjmIHPKfwdWc4_-Eim_xzVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmlkeWFsYXlhLm9y/Zy5pbi93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNS8wMy81MWM0/ODQ0ZGQ2YjMwMGMw/ODg5YjE1ODhiNWUw/ZWI1Ni5qcGc',
            highlight: '20 Smart Rooms',
            Number: '20 Smart Rooms',
            price: 'Smart Classroom',
            room: 'Blocks A & B',
         },
         {
            title: 'Library',
            Heading: 'A Place for Knowledge and Discovery',
            description:
               'Explore books, technical references, journals, and digital learning resources to support your studies and independent research. Quiet study areas and collaborative spaces encourage focused learning, knowledge sharing, and deeper exploration of subjects.',
            image: 'https://imgs.search.brave.com/rr3d9sS74iqNn_7aZs6RiwToF2kdQWKkqrcSRAueA1I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vbW9kZXJuLWxp/YnJhcnktaW50ZXJp/b3Itd2l0aC1yZWFk/aW5nLWFyZWFfODkw/ODU5LTY4MjM2Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDAm/cT04MA',
            highlight: '15,000+ Books',
            Number: '15,000+ Books',
            price: 'Resource Center',
            room: 'Central Wing',
         },
         {
            title: 'Campus Hostels',
            Heading: 'A Comfortable Place to Call Home',
            description:
               'Residential facilities are designed to support students who need accommodation during their studies. Furnished rooms, internet access, security arrangements, and shared dining and recreation facilities help create a supportive residential environment.',
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop',
            highlight: '400+ Capacity',
            Number: '400+ Capacity',
            price: 4500,
            room: 'Residential Block',
         },
         {
            title: 'Campus Transport',
            Heading: 'Convenient Connections to Campus',
            description:
               'Campus transport services help students travel between designated city locations and the institution. Planned routes and organized transportation support a more convenient daily commute.',
            image: 'https://imgs.search.brave.com/ppJeDz_uTyqL-DdRyOWiEId0lJQ06wX0vACNMlJuvXc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTA1/ODQ1NDYvcGV4ZWxz/LXBob3RvLTEwNTg0/NTQ2LmpwZWc_Y3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA',
            highlight: '15 City Routes',
            Number: '15 City Routes',
            price: 800,
            room: 'Campus Bus Fleet',
         },
         {
            title: 'High-Speed Wi-Fi',
            Heading: 'Stay Connected. Keep Learning.',
            description:
               'Internet connectivity supports research, online learning, software development, collaboration, and access to digital resources. Students can use connected learning spaces to explore documentation, work with development tools, and continue learning beyond textbooks.',
            image: 'https://imgs.search.brave.com/faLTu8BMORPoxIx7nAkbJkZbo1GRDDyalK87Qts_9lc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/dG9wLXZpZXctd2kt/Zmktcm91dGVyLXdp/dGgtc21hcnRwaG9u/ZS1ub3RlYm9va18y/My0yMTQ4Nzc5MjQ5/LmpwZz9nYT1HQTEu/MS4xNzkzNDY1NDk4/LjE3OTE5NTUxMDgm/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA',
            highlight: 'Up to 1 Gbps',
            Number: 'Up to 1 Gbps',
            price: 'Campus-Wide',
            room: 'All Zones',
         },
         {
            title: 'Innovation and Hackathon Lounge',
            Heading: 'Turn Ideas Into Projects',
            description:
               'A collaborative space for students to experiment, develop prototypes, work in teams, and explore new ideas. Project-building activities and hackathons encourage creative thinking, practical problem-solving, and the confidence to build something of their own.',
            image: 'https://imgs.search.brave.com/0J8xZ2n5lhSo-_YeWt_9kgA4Cbwd19eAI3FrNALd28o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3RvY2tjYWtl/LmNvbS9wdWJsaWMv/ZS9iLzMvZWIzOWQ2/NDYtOGFjZi00ZDVj/LWE3ZjItNGM1NTFj/ZTU5NjA0X2xhcmdl/L2VuZ2luZWVyaW5n/LXRlYW0td29ya2lu/Zy1zdG9ja2Nha2Uu/anBn',
            highlight: 'Dedicated Innovation Space',
            Number: 'Dedicated Innovation Space',
            price: 'Project Studio',
            room: 'Maker Hub',
         },
         {
            title: 'Health and Wellness',
            Heading: 'Supporting Student Well-Being',
            description:
               'Student well-being is an important part of a positive learning experience. Health and wellness facilities aim to support students through basic medical assistance, first-aid services, and access to appropriate support when needed.',
            image: 'https://imgs.search.brave.com/jYgAuTLpYiHY0bNRJ_aMEDo6f5NKo-qzzxzS_8Q6nD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXVza2Vnb25jYy5l/ZHUvd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMDMvSGVhbHRo/X2FuZF9XZWxsbmVz/c19DZW50ZXJfMl8z/XzJfNjAwLmpwZw',
            highlight: 'On-Campus Support',
            Number: 'On-Campus Support',
            price: 'Wellness Clinic',
            room: 'Care Wing',
         },
         {
            title: 'Sports and Athletics',
            Heading: 'Stay Active. Play Together. Grow Stronger.',
            description:
               'Sports and recreational activities encourage physical fitness, teamwork, discipline, and healthy competition. Opportunities to participate in indoor and outdoor games help students balance academic responsibilities with an active campus life.',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
            highlight: 'Indoor and Outdoor Activities',
            Number: 'Indoor & Outdoor',
            price: 'Sports Complex',
            room: 'Arena & Fields',
         },
         {
            title: 'Career Development and Placement',
            Heading: 'Prepare for Your Next Opportunity',
            description:
               'Career preparation helps students understand professional expectations and develop the skills needed to pursue employment opportunities. Activities such as resume preparation, interview practice, technical workshops, and career guidance can help students approach their next steps with greater confidence.',
            image: 'https://imgs.search.brave.com/bg6xfuD2xH9HB9PfzOMo5-ggvnbzDX54gdW7qnO11Lk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wY2Fj/cy5hYy5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNS8wMS9K/b2ItRmFpci0yMDI0/LTYuanBn',
            highlight: 'Career Preparation and Guidance',
            Number: 'Placement Cell',
            price: 'Guidance Desk',
            room: 'Career Center',
         },
      ],
   },

   academicPrograms: {
      heading: 'Find a Learning Path That Fits Your Goals',
      introduction:
         'Whether you want to build a foundation in computing, understand business, or develop practical web development skills, explore learning pathways designed around your interests and future ambitions.',
      programs: [
         {
            name: 'Bachelor of Computer Applications (BCA)',
            duration: '3 Years | 6 Semesters',
            description:
               'Develop a strong foundation in computer applications, programming, and information technology. Explore subjects such as web development, data structures, databases, cloud computing, and software architecture while building the knowledge needed to understand and create software applications.',
            cta: 'Explore BCA',
         },
         {
            name: 'Bachelor of Business Administration (BBA)',
            duration: '3 Years | 6 Semesters',
            description:
               'Build an understanding of business operations, management, and organizational decision-making. Explore areas such as marketing, financial management, business analytics, and strategic planning to develop a foundation for further study and professional growth.',
            cta: 'Explore BBA',
         },
         {
            name: 'Full Stack Web Development Certification',
            duration: '1 Year | Fast-Track Program',
            description:
               'Learn how modern web applications are designed, developed, and deployed. Build practical skills across frontend development, backend programming, databases, and application deployment using technologies such as React, Node.js, Next.js, PostgreSQL, and Docker.',
            cta: 'Explore the Program',
         },
      ],
   },

   gallery: {
      heading: 'Life at Ednora',
      introduction:
         'Learning happens in many places, from classrooms and computer labs to collaborative projects and campus events. Explore moments that reflect student creativity, teamwork, academic activities, and the experiences that make campus life meaningful.',
   },

   testimonials: {
      heading: 'Experiences That Inspire Us',
      introduction:
         'Every learning journey is different. Student experiences can offer a valuable perspective on the teaching, resources, and opportunities that shape life at an institution.',
      list: [
         {
            _id: 'testimonial-1',
            id: 'testimonial-1',
            name: 'Aman Raj',
            job_Role: 'BCA (Batch 2022-2025) · Software Engineer',
            star: 5,
            rating: 5,
            message:
               'The hands-on computer labs and faculty mentorship at CIITM gave me the exact foundation I needed. Working on real full-stack web projects helped me clear campus placements with confidence.',
            image: '/Student_Avtar.webp',
         },
         {
            _id: 'testimonial-2',
            id: 'testimonial-2',
            name: 'Priya Kumari',
            job_Role: 'BBA (Batch 2023-2026) · Marketing Lead',
            star: 5,
            rating: 5,
            message:
               'The faculty here emphasizes practical business case studies and communication skills. The campus atmosphere is supportive, and the seminar sessions with industry leaders are truly inspiring.',
            image: '/Student_Avtar.webp',
         },
         {
            _id: 'testimonial-3',
            id: 'testimonial-3',
            name: 'Rohan Verma',
            job_Role: 'Full Stack Web Dev Certification · Frontend Dev',
            star: 5,
            rating: 5,
            message:
               'Transitioning into modern web development was smooth thanks to the guided curriculum covering React, Node.js, and databases. The hackathon lounge gave us space to build real apps.',
            image: '/Student_Avtar.webp',
         },
         {
            _id: 'testimonial-4',
            id: 'testimonial-4',
            name: 'Sneha Mukherjee',
            job_Role: 'BCA (Batch 2021-2024) · Cloud Support Associate',
            star: 5,
            rating: 5,
            message:
               'From database administration to cloud architecture, CIITM provided a very well-structured syllabus. The placement cell guided us through mock technical rounds and interview preparation.',
            image: '/Student_Avtar.webp',
         },
      ],
   },

   contactPage: {
      title: "Let's Start a Conversation",
      paragraph:
         "Have questions about admissions, academic programs, campus facilities, or student life? We're here to help. Get in touch with our team to find the information you need and take the next step in your educational journey.",
      location:
         'Ednora Campus, Knowledge City, Dhanbad, Jharkhand 826001',
      email: 'info@ednora.edu',
      phone: '+91 96613 42993',
      hours: 'Monday to Saturday, 9:00 AM – 5:30 PM',
      cta: 'Contact Our Team',
   },

   authPage: {
      Login: {
         title: 'Welcome Back!',
         paragraph:
            'Continue your learning journey with Ednora. Sign in to access your student portal, review available academic information, check attendance, download fee receipts, and stay informed about important updates.',
         button: 'Sign In',
         supporting:
            "Don't have an account? Create one to get started.",
         image: '/login.png',
      },
      SignUp: {
         title: 'Start Your Journey with Ednora',
         paragraph:
            'Take the first step toward your academic goals. Create your account to begin the registration process, follow your application progress, and connect with the team for guidance on your next steps.',
         button: 'Create Account',
         supporting: 'Already have an account? Sign in.',
         image: '/signup.png',
      },
   },

   footer: {
      heading: 'Ednora — Where Knowledge Finds Its Future',
      paragraph:
         'Helping learners build knowledge, develop practical skills, and explore new possibilities through education, technology, and innovation.',
      closingLine:
         'Learn with purpose. Build with confidence. Grow for the future.',
   },
};

export default frontendConfig;
