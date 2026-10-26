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
         homeTitle: 'Ednora — Where Knowledge Finds Its Future',
         homeParagraph:
            'Empowering future leaders with industry-aligned technical education, innovative computing labs, dedicated mentorship, and hands-on project excellence.',
      },
      AboutSection: {
         Heading_First: 'Empowering Young Minds, Shaping Bright Futures',
         Heading_Second: 'Pioneering Excellence in Computing & Emerging Technologies',
         paragraph_First:
            'Ednora is a premier educational institution committed to imparting cutting-edge technical knowledge, creative problem-solving capabilities, and professional ethics. We believe in nurturing curious minds through innovative teaching methodologies, modern digital infrastructure, and comprehensive growth opportunities.',
         paragraph_Second:
            'Our hands-on laboratory experiences, guided capstone projects, and industry-oriented curriculum prepare students to lead confidently in an increasingly digital world.',
         image_First: '/Rectangle_1.webp',
         image_Second: '/Rectangle-2.webp',
         image_Third: '/Rectangle.webp',
      },
      Mission_and_Goals: [
         {
            title: 'Innovation',
            content:
               'Delivering next-generation curriculum in Software Engineering, Cloud Computing, and Artificial Intelligence.',
            image: '/Bagpack.webp',
         },
         {
            title: 'Integrity',
            content:
               'Cultivating an enduring culture of trust, intellectual honesty, and ethical leadership.',
            image: '/Knowledge.webp',
         },
         {
            title: 'Excellence',
            content:
               'Setting the benchmark for academic rigour, practical mastery, and career outcomes.',
            image: '/Student.webp',
         },
         {
            title: 'Diversity',
            content:
               'Celebrating diverse perspectives, inclusive cultures, and collaborative learning environments.',
            image: '/Clock.webp',
         },
         {
            title: 'Collaboration',
            content:
               'Promoting teamwork, open-source projects, peer coding, and interdisciplinary hackathons.',
            image: '/Webinar.webp',
         },
         {
            title: 'Sustainability',
            content:
               'Fostering socially responsible technocrats equipped to engineer a greener and smarter tomorrow.',
            image: '/Research.webp',
         },
      ],
   },

   aboutPage: {
      AboutHero: {
         image: '/About_Hero.webp',
         Heading: 'Ignite Curiosity, Master Technology, Shape Tomorrow',
         paragraph:
            'Welcome to Ednora — an institution dedicated to fostering innovation, practical knowledge, and holistic personal growth. Our mission is to prepare tomorrow’s innovators by providing exceptional educational opportunities and encouraging intellectual exploration.',
      },
      History: {
         title: 'History & Heritage',
         paragraph_First:
            'Founded with a clear commitment to world-class technical education, Ednora was established to address the rapidly evolving needs of the modern technology industry and digital economy.',
         paragraph_Second:
            'Over the years, our institution has emerged as a beacon of academic excellence and experiential learning, empowering thousands of aspiring scholars with practical engineering skills.',
         paragraph_Third:
            'Through continuous curriculum innovation, hands-on laboratory workshops, and industry partnerships, we have built an environment where curiosity transforms into capability.',
         paragraph_Four:
            'Today, Ednora continues to push boundaries, expanding modern computing facilities and fostering a culture of lifelong learning and technological leadership.',
      },
      Vision_and_Mission: {
         title: 'Vision & Mission',
         paragraph_First:
            'Our vision is to be recognized globally as a premier center of excellence for computing sciences, application development, and technological entrepreneurship.',
         paragraph_Second:
            'Our mission is to deliver high-quality, accessible, and market-relevant education that empowers students from all backgrounds with 21st-century digital competencies.',
         paragraph_Third:
            'We are dedicated to building a learning ecosystem rooted in ethical values, critical inquiry, problem-solving, and continuous innovation.',
         paragraph_Four:
            'We maintain strong collaborative ties with global technology leaders to ensure immersive internship experiences, live project exposure, and outstanding career placement.',
      },
      Description: {
         image: '/Knowledge.webp',
         paragraph:
            'Ednora provides comprehensive, state-of-the-art campus amenities designed to support students both academically and personally, fostering a productive and fulfilling campus life.',
         price: 'All-Inclusive',
         room: 'Smart Learning Spaces',
      },
      Facilities: [
         {
            title: 'Advanced Computer Labs',
            Heading:
               'Fully air-conditioned laboratories equipped with high-performance multi-core workstations, dual-screen setups, and high-speed fiber internet.',
            description:
               'Over 200 modern workstations pre-configured with Linux and Windows developer environments, database engines, and software toolchains.',
            image: '/Knowledge.webp',
            Number: '6 Modern Labs',
            Price: 'Included in Tuition',
         },
         {
            title: 'Digital Classrooms',
            Heading:
               'Smart lecture halls featuring interactive touch panels, high-definition projection, and high-fidelity acoustics for hybrid interactive pedagogy.',
            description:
               'Equipped for recorded lectures, live guest webinars from global tech leaders, and immersive multimedia learning.',
            image: '/Webinar.webp',
            Number: '20 Smart Rooms',
            Price: 'Included in Tuition',
         },
         {
            title: 'Comprehensive Library',
            Heading:
               'An expansive modern library housing thousands of printed technical volumes, journals, e-books, and 24/7 digital academic databases.',
            description:
               'Dedicated quiet study pods, collaborative group research lounges, and direct online access to leading technical publishers.',
            image: '/Bagpack.webp',
            Number: '15,000+ Books',
            Price: 'Included in Tuition',
         },
         {
            title: 'Campus Hostels',
            Heading:
               'Safe, comfortable, and well-maintained residential hostels with dedicated blocks for male and female students.',
            description:
               'Furnished rooms with high-speed Wi-Fi, 24/7 security, power backup, recreational commons, and nutritious dining facilities.',
            image:
               'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop',
            Number: '400+ Capacity',
            Price: 4500,
         },
         {
            title: 'Campus Transport',
            Heading:
               'Extensive transport network connecting all major city zones and residential neighborhoods directly to campus.',
            description:
               'Fleet of GPS-monitored, comfortable buses operated by trained drivers ensuring punctual and safe daily transit.',
            image:
               'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop',
            Number: '15 City Routes',
            Price: 800,
         },
         {
            title: 'High-Speed Wi-Fi',
            Heading:
               'Campus-wide gigabit wireless connectivity across lecture halls, laboratory zones, cafeteria, and student lawns.',
            description:
               'Secure optical-fiber internet backbone ensuring rapid access to developer documentation, cloud repositories, and learning platforms.',
            image: '/Research.webp',
            Number: '1 Gbps Speed',
            Price: 'Included in Tuition',
         },
         {
            title: 'Innovation & Hackathon Lounge',
            Heading:
               'Creative makerspace designed for project building, startup incubation, and weekend hackathons.',
            description:
               'Equipped with IoT hardware kits, testing devices, agile whiteboards, and presentation zones to bring student software ideas to life.',
            image: '/Student.webp',
            Number: '24/7 Access',
            Price: 'Included in Tuition',
         },
         {
            title: 'Health & Wellness Center',
            Heading:
               'On-campus medical clinic providing routine healthcare, emergency first-aid, and student counseling services.',
            description:
               'Staffed by qualified medical practitioners ensuring student physical and psychological health throughout the academic year.',
            image:
               'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
            Number: 'Full-Time Medical Desk',
            Price: 'Included in Tuition',
         },
         {
            title: 'Sports & Athletics Complex',
            Heading:
               'Spacious outdoor playing fields and indoor sports arena promoting physical fitness, team bonding, and athletic recreation.',
            description:
               'Facilities for cricket, football, basketball, badminton, table tennis, and a dedicated fitness gymnasium.',
            image:
               'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
            Number: '3 Sports Grounds',
            Price: 'Included in Tuition',
         },
         {
            title: 'Career Placement & Industry Cell',
            Heading:
               'Dedicated corporate relations department delivering placement preparation, resume reviews, and technical interview workshops.',
            description:
               'Consistently facilitating on-campus recruitment with top technology firms, multinational enterprises, and high-growth startups.',
            image: '/Clock.webp',
            Number: '100+ Recruiter Network',
            Price: 'Included in Tuition',
         },
      ],
      Teachers: [
         {
            _id: 'teacher-1',
            name: 'Prof. A. K. Sharma',
            role: 'Head of Department - Computer Applications',
            qualification: 'Ph.D in Computer Science, M.Tech (CS)',
            image:
               'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
         },
         {
            _id: 'teacher-2',
            name: 'Prof. Neha Gupta',
            role: 'Associate Professor - Web Technologies & Cloud',
            qualification: 'MCA, Cloud Solutions Specialist',
            image:
               'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
         },
         {
            _id: 'teacher-3',
            name: 'Prof. Vikram Verma',
            role: 'Assistant Professor - Data Structures & Algorithms',
            qualification: 'M.Tech in Software Engineering',
            image:
               'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
         },
      ],
      Courses: [
         {
            _id: 'course-1',
            name: 'Bachelor of Computer Applications (BCA)',
            duration: '3 Years (6 Semesters)',
            description:
               'In-depth degree program covering Modern Web Development, Data Structures, Cloud Computing, Database Engineering, and Software Architecture.',
         },
         {
            _id: 'course-2',
            name: 'Bachelor of Business Administration (BBA)',
            duration: '3 Years (6 Semesters)',
            description:
               'Foundational business leadership curriculum covering Digital Marketing, Financial Management, Analytics, and Strategic Management.',
         },
         {
            _id: 'course-3',
            name: 'Full Stack Web Development Certification',
            duration: '1 Year (Fast Track)',
            description:
               'Intensive hands-on professional track covering React, Node.js, Next.js, PostgreSQL, Docker, and Production DevOps.',
         },
      ],
   },

   galleryPage: {
      albums: [
         {
            _id: 'album-1',
            aName: 'Annual Tech Fest & Hackathon',
            aDescription:
               'Students collaborating and pitching innovative software solutions.',
            aImage_url:
               'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
            createdAt: '2026-03-15',
         },
         {
            _id: 'album-2',
            aName: 'Modern Laboratories & Hackerspace',
            aDescription:
               'Hands-on coding, algorithmic research, and system design in action.',
            aImage_url:
               'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
            createdAt: '2026-02-20',
         },
         {
            _id: 'album-3',
            aName: 'Graduation & Convocation Ceremony',
            aDescription:
               'Celebrating academic milestones and embarking on career journeys.',
            aImage_url:
               'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
            createdAt: '2026-01-10',
         },
      ],
      images: [
         {
            _id: 'img-1',
            name: 'High-Performance Lab Sessions',
            albumName: 'Modern Laboratories & Hackerspace',
            url:
               'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
         },
         {
            _id: 'img-2',
            name: 'Student Innovation Summit',
            albumName: 'Annual Tech Fest & Hackathon',
            url:
               'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
         },
         {
            _id: 'img-3',
            name: 'Campus Library & Study Lounges',
            albumName: 'Campus Life',
            url:
               'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop',
         },
         {
            _id: 'img-4',
            name: 'Smart Classrooms & Discussions',
            albumName: 'Campus Life',
            url:
               'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
         },
      ],
   },

   testimonials: [
      {
         id: 'test-1',
         name: 'Rahul Sharma',
         role: 'BCA Alumni — Software Engineer at TCS',
         avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
         message:
            'Ednora provided the perfect launchpad for my tech career. The faculty mentorship, modern labs, and hands-on capstones helped me secure my dream software developer role.',
      },
      {
         id: 'test-2',
         name: 'Priya Kumari',
         role: 'BCA Final Year Scholar',
         avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
         message:
            'The learning atmosphere at Ednora is exceptional. The instructors genuinely care about our progress, and the curriculum is consistently refreshed with real-world technologies.',
      },
      {
         id: 'test-3',
         name: 'Aman Verma',
         role: 'BCA Alumni — Cloud Engineer at Infosys',
         avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
         message:
            'Practical exposure to full stack web development and cloud architectures made all the difference during campus recruitment. Highly recommended institution!',
      },
   ],

   contactPage: {
      title: 'Contact Ednora',
      subtitle:
         'Have questions regarding admissions, curriculum, or facilities? Our academic team is here to assist you.',
      location: 'Ednora Campus, Knowledge City, Dhanbad, Jharkhand 826001',
      email: 'info@ednora.edu',
      phone: '+91 96613 42993',
      hours: 'Monday to Saturday: 9:00 AM – 5:30 PM',
      principal: 'Prof. Abhishek Gupta (Dean of Academics)',
   },

   authPage: {
      Login: {
         title: 'Welcome Back to Ednora',
         paragraph:
            'Access your student portal to review coursework, view attendance, download fee receipts, and stay updated.',
         image: '/login.png',
      },
      SignUp: {
         title: 'Join the Ednora Community',
         paragraph:
            'Create your student account to register for admissions, track application progress, and connect with advisors.',
         image: '/signup.png',
      },
   },
};

export default frontendConfig;
