export const coursesData = [
  // Professional Certifications - Top Companies (IDs 1-6)
  {
    id: 1,
    title: "AWS Solutions Architect Professional Certification",
    instructor: "Dr. Patricia Lee",
    rating: 4.9,
    students: 45200,
    duration: "78 hours",
    price: 299.99,
    originalPrice: 499.99,
    category: "Cloud Computing",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    description: "Complete preparation for AWS Solutions Architect Professional certification. Master advanced cloud architecture, security, and cost optimization strategies.",
    tags: ["AWS", "Cloud Architecture", "Professional Certification", "Solutions Architect"],
    lessons: [
      { id: 1, title: "Advanced AWS Architecture Patterns", duration: "2h 15min", videoUrl: "aws_arch1.mp4" },
      { id: 2, title: "Multi-Region and Multi-Account Strategies", duration: "1h 45min", videoUrl: "aws_arch2.mp4" },
      { id: 3, title: "Security and Compliance Deep Dive", duration: "2h 30min", videoUrl: "aws_security.mp4" },
      { id: 4, title: "Cost Optimization and Performance", duration: "1h 55min", videoUrl: "aws_cost.mp4" },
      { id: 5, title: "Migration Strategies and Hybrid Cloud", duration: "2h 10min", videoUrl: "aws_migration.mp4" },
      { id: 6, title: "Practice Exams and Case Studies", duration: "3h 20min", videoUrl: "aws_practice.mp4" }
    ],
    isPaid: true,
    certification: "AWS Solutions Architect Professional"
  },
  {
    id: 2,
    title: "Microsoft Azure Fundamentals AZ-900 Certification",
    instructor: "Sarah Mitchell",
    rating: 4.8,
    students: 38500,
    duration: "65 hours",
    price: 249.99,
    originalPrice: 399.99,
    category: "Cloud Computing",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1662811145073-aabe76a09010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhenVyZSUyMGNsb3VkJTIwY29tcHV0aW5nfGVufDF8fHx8MTc1NTY5MjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master Microsoft Azure cloud fundamentals and earn your AZ-900 certification. Complete preparation with hands-on labs and practice exams.",
    tags: ["Azure", "Microsoft", "Cloud Fundamentals", "AZ-900"],
    lessons: [
      { id: 1, title: "Azure Cloud Concepts and Services", duration: "2h 30min", videoUrl: "azure_concepts.mp4" },
      { id: 2, title: "Azure Compute and Storage Services", duration: "2h 15min", videoUrl: "azure_compute.mp4" },
      { id: 3, title: "Azure Networking and Security", duration: "2h 45min", videoUrl: "azure_network.mp4" },
      { id: 4, title: "Azure Identity and Governance", duration: "1h 50min", videoUrl: "azure_identity.mp4" },
      { id: 5, title: "Azure Management and Monitoring", duration: "2h 10min", videoUrl: "azure_management.mp4" },
      { id: 6, title: "Exam Preparation and Practice Tests", duration: "2h 35min", videoUrl: "azure_exam.mp4" }
    ],
    isPaid: true,
    certification: "Microsoft Azure Fundamentals AZ-900"
  },
  {
    id: 3,
    title: "Google Cloud Professional Cloud Architect",
    instructor: "Dr. Kevin Chang",
    rating: 4.9,
    students: 29800,
    duration: "85 hours",
    price: 349.99,
    originalPrice: 599.99,
    category: "Cloud Computing",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1728710718080-3cf64d995d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBjbG91ZCUyMHBsYXRmb3JtJTIwY2VydGlmaWNhdGlvbnxlbnwxfHx8fDE3NTU2OTI0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Complete preparation for Google Cloud Professional Cloud Architect certification. Design secure, scalable, and reliable cloud solutions.",
    tags: ["Google Cloud", "Cloud Architect", "GCP", "Professional Certification"],
    lessons: [
      { id: 1, title: "GCP Architecture and Design Principles", duration: "2h 45min", videoUrl: "gcp_arch.mp4" },
      { id: 2, title: "Compute Engine and Kubernetes Engine", duration: "2h 20min", videoUrl: "gcp_compute.mp4" },
      { id: 3, title: "Data Storage and Database Solutions", duration: "2h 55min", videoUrl: "gcp_data.mp4" },
      { id: 4, title: "Security and Identity Management", duration: "2h 10min", videoUrl: "gcp_security.mp4" },
      { id: 5, title: "Network Design and Implementation", duration: "2h 35min", videoUrl: "gcp_network.mp4" },
      { id: 6, title: "Case Studies and Exam Preparation", duration: "3h 15min", videoUrl: "gcp_exam.mp4" }
    ],
    isPaid: true,
    certification: "Google Cloud Professional Cloud Architect"
  },
  {
    id: 4,
    title: "Oracle Database 19c Administration Certification",
    instructor: "Marcus Thompson",
    rating: 4.7,
    students: 22400,
    duration: "72 hours",
    price: 279.99,
    originalPrice: 449.99,
    category: "Database",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1662947774804-917520490b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFjbGUlMjBkYXRhYmFzZSUyMGNlcnRpZmljYXRpb258ZW58MXx8fHwxNzU1NjkyNDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master Oracle Database 19c administration and earn your OCA certification. Complete coverage of installation, configuration, and maintenance.",
    tags: ["Oracle", "Database Administration", "DBA", "Certification"],
    lessons: [
      { id: 1, title: "Oracle Database Architecture", duration: "2h 25min", videoUrl: "oracle_arch.mp4" },
      { id: 2, title: "Installation and Configuration", duration: "2h 10min", videoUrl: "oracle_install.mp4" },
      { id: 3, title: "User Management and Security", duration: "2h 35min", videoUrl: "oracle_security.mp4" },
      { id: 4, title: "Backup and Recovery Strategies", duration: "2h 50min", videoUrl: "oracle_backup.mp4" },
      { id: 5, title: "Performance Tuning and Optimization", duration: "2h 40min", videoUrl: "oracle_performance.mp4" },
      { id: 6, title: "Exam Practice and Real Scenarios", duration: "2h 20min", videoUrl: "oracle_exam.mp4" }
    ],
    isPaid: true,
    certification: "Oracle Database 19c Administration"
  },
  {
    id: 5,
    title: "Cisco CCNA 200-301 Network Certification",
    instructor: "Jennifer Park",
    rating: 4.8,
    students: 35600,
    duration: "95 hours",
    price: 329.99,
    originalPrice: 549.99,
    category: "Computer Networks",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1729549223893-b340db51e577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXNjbyUyMG5ldHdvcmtpbmclMjBjZXJ0aWZpY2F0aW9ufGVufDF8fHx8MTc1NTY5MjQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Complete Cisco CCNA certification preparation with hands-on labs. Master networking fundamentals, routing, switching, and security.",
    tags: ["Cisco", "CCNA", "Networking", "Routing & Switching"],
    lessons: [
      { id: 1, title: "Network Fundamentals and OSI Model", duration: "2h 30min", videoUrl: "ccna_fundamentals.mp4" },
      { id: 2, title: "Ethernet and LAN Switching", duration: "3h 15min", videoUrl: "ccna_switching.mp4" },
      { id: 3, title: "IP Addressing and Subnetting", duration: "2h 45min", videoUrl: "ccna_ip.mp4" },
      { id: 4, title: "Routing Protocols and Configuration", duration: "3h 25min", videoUrl: "ccna_routing.mp4" },
      { id: 5, title: "Network Security and Access Control", duration: "2h 50min", videoUrl: "ccna_security.mp4" },
      { id: 6, title: "Wireless and Automation", duration: "2h 40min", videoUrl: "ccna_wireless.mp4" },
      { id: 7, title: "Lab Exercises and Exam Prep", duration: "3h 10min", videoUrl: "ccna_labs.mp4" }
    ],
    isPaid: true,
    certification: "Cisco CCNA 200-301"
  },
  {
    id: 6,
    title: "Salesforce Administrator Certification",
    instructor: "Maria Santos",
    rating: 4.6,
    students: 28900,
    duration: "68 hours",
    price: 259.99,
    originalPrice: 429.99,
    category: "CRM",
    level: "Professional",
    thumbnail: "https://images.unsplash.com/photo-1565688527174-775059ac429c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlc2ZvcmNlJTIwY2VydGlmaWNhdGlvbiUyMHRyYWluaW5nfGVufDF8fHx8MTc1NTY5MjQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master Salesforce administration and earn your Administrator certification. Complete coverage of user management, security, and customization.",
    tags: ["Salesforce", "CRM", "Administrator", "Certification"],
    lessons: [
      { id: 1, title: "Salesforce Platform Overview", duration: "1h 55min", videoUrl: "sf_overview.mp4" },
      { id: 2, title: "User and Data Management", duration: "2h 40min", videoUrl: "sf_users.mp4" },
      { id: 3, title: "Security and Access Controls", duration: "2h 25min", videoUrl: "sf_security.mp4" },
      { id: 4, title: "Customization and Configuration", duration: "2h 50min", videoUrl: "sf_custom.mp4" },
      { id: 5, title: "Automation and Workflow", duration: "2h 35min", videoUrl: "sf_automation.mp4" },
      { id: 6, title: "Reports and Dashboards", duration: "2h 15min", videoUrl: "sf_reports.mp4" },
      { id: 7, title: "Exam Preparation and Practice", duration: "2h 20min", videoUrl: "sf_exam.mp4" }
    ],
    isPaid: true,
    certification: "Salesforce Administrator"
  },

  // Programming & Development (IDs 7-16)
  {
    id: 7,
    title: "Complete JavaScript Mastery",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 25420,
    duration: "125 hours",
    price: 89.99,
    originalPrice: 199.99,
    category: "Programming",
    level: "Beginner to Advanced",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, DOM manipulation, and modern frameworks.",
    tags: ["JavaScript", "ES6+", "DOM", "Async/Await"],
    lessons: [
      { id: 1, title: "JavaScript Fundamentals", duration: "3h 45min", videoUrl: "video1.mp4" },
      { id: 2, title: "Variables and Data Types", duration: "2h 38min", videoUrl: "video2.mp4" },
      { id: 3, title: "Functions and Scope", duration: "4h 52min", videoUrl: "video3.mp4" },
      { id: 4, title: "DOM Manipulation", duration: "3h 47min", videoUrl: "video4.mp4" },
      { id: 5, title: "Async JavaScript", duration: "4h 15min", videoUrl: "video5.mp4" },
      { id: 6, title: "ES6+ Features", duration: "3h 20min", videoUrl: "video6.mp4" },
      { id: 7, title: "Object-Oriented Programming", duration: "4h 30min", videoUrl: "video7.mp4" },
      { id: 8, title: "Modern JavaScript Frameworks", duration: "5h 25min", videoUrl: "video8.mp4" }
    ],
    isPaid: true
  },
  {
    id: 8,
    title: "React.js Complete Course",
    instructor: "Mike Chen",
    rating: 4.9,
    students: 18750,
    duration: "156 hours",
    price: 99.99,
    originalPrice: 249.99,
    category: "Frontend",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    description: "Build modern web applications with React.js. Learn hooks, context, routing, state management, and best practices.",
    tags: ["React", "Hooks", "JSX", "State Management"],
    lessons: [
      { id: 1, title: "React Fundamentals", duration: "4h 50min", videoUrl: "react1.mp4" },
      { id: 2, title: "Components and Props", duration: "3h 45min", videoUrl: "react2.mp4" },
      { id: 3, title: "State and Lifecycle", duration: "4h 55min", videoUrl: "react3.mp4" },
      { id: 4, title: "React Hooks", duration: "5h 20min", videoUrl: "react4.mp4" },
      { id: 5, title: "Context API", duration: "3h 40min", videoUrl: "react5.mp4" },
      { id: 6, title: "React Router", duration: "4h 15min", videoUrl: "react6.mp4" },
      { id: 7, title: "State Management with Redux", duration: "5h 30min", videoUrl: "react7.mp4" },
      { id: 8, title: "Testing and Optimization", duration: "4h 25min", videoUrl: "react8.mp4" }
    ],
    isPaid: true
  },
  {
    id: 9,
    title: "Python Programming Bootcamp",
    instructor: "Dr. Alex Rodriguez",
    rating: 4.7,
    students: 32100,
    duration: "180 hours",
    price: 79.99,
    originalPrice: 179.99,
    category: "Programming",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
    description: "Learn Python from scratch. Cover data structures, OOP, web scraping, data analysis, and automation.",
    tags: ["Python", "Data Structures", "OOP", "Automation"],
    lessons: [
      { id: 1, title: "Python Basics", duration: "4h 42min", videoUrl: "python1.mp4" },
      { id: 2, title: "Data Types and Structures", duration: "5h 48min", videoUrl: "python2.mp4" },
      { id: 3, title: "Object-Oriented Programming", duration: "6h 25min", videoUrl: "python3.mp4" },
      { id: 4, title: "File Handling and I/O", duration: "3h 35min", videoUrl: "python4.mp4" },
      { id: 5, title: "Web Scraping and APIs", duration: "5h 58min", videoUrl: "python5.mp4" },
      { id: 6, title: "Data Analysis with Pandas", duration: "6h 15min", videoUrl: "python6.mp4" },
      { id: 7, title: "Web Development with Django", duration: "7h 30min", videoUrl: "python7.mp4" },
      { id: 8, title: "Automation and Scripting", duration: "4h 45min", videoUrl: "python8.mp4" }
    ],
    isPaid: false
  },
  {
    id: 10,
    title: "Node.js & Express Backend Development",
    instructor: "Jennifer Park",
    rating: 4.6,
    students: 14200,
    duration: "142 hours",
    price: 94.99,
    originalPrice: 199.99,
    category: "Backend",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    description: "Build scalable backend applications with Node.js and Express. Learn REST APIs, databases, authentication, and deployment.",
    tags: ["Node.js", "Express", "REST API", "MongoDB"],
    lessons: [
      { id: 1, title: "Node.js Fundamentals", duration: "4h 46min", videoUrl: "node1.mp4" },
      { id: 2, title: "Express Framework", duration: "5h 52min", videoUrl: "node2.mp4" },
      { id: 3, title: "REST API Development", duration: "6h 18min", videoUrl: "node3.mp4" },
      { id: 4, title: "Database Integration", duration: "5h 50min", videoUrl: "node4.mp4" },
      { id: 5, title: "Authentication & Security", duration: "5h 55min", videoUrl: "node5.mp4" },
      { id: 6, title: "Testing and Error Handling", duration: "4h 25min", videoUrl: "node6.mp4" },
      { id: 7, title: "Deployment and DevOps", duration: "3h 40min", videoUrl: "node7.mp4" }
    ],
    isPaid: true
  },
  {
    id: 11,
    title: "Go Programming Language Complete Course",
    instructor: "Tom Anderson",
    rating: 4.6,
    students: 9800,
    duration: "115 hours",
    price: 89.99,
    originalPrice: 199.99,
    category: "Programming",
    level: "Beginner to Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xhbmclMjBwcm9ncmFtbWluZyUyMGxhbmd1YWdlfGVufDF8fHx8MTc1NTY5Mjg0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master Go programming from basics to advanced concepts. Learn concurrency, web development, and microservices with Go.",
    tags: ["Go", "Golang", "Concurrency", "Microservices"],
    lessons: [
      { id: 1, title: "Go Fundamentals", duration: "4h 48min", videoUrl: "go1.mp4" },
      { id: 2, title: "Structs and Interfaces", duration: "5h 52min", videoUrl: "go2.mp4" },
      { id: 3, title: "Concurrency with Goroutines", duration: "6h 25min", videoUrl: "go3.mp4" },
      { id: 4, title: "Web Development", duration: "5h 58min", videoUrl: "go4.mp4" },
      { id: 5, title: "Building APIs", duration: "5h 55min", videoUrl: "go5.mp4" },
      { id: 6, title: "Testing and Debugging", duration: "4h 30min", videoUrl: "go6.mp4" },
      { id: 7, title: "Performance Optimization", duration: "3h 45min", videoUrl: "go7.mp4" }
    ],
    isPaid: true
  },
  {
    id: 12,
    title: "Django Web Development Bootcamp",
    instructor: "Rachel Green",
    rating: 4.8,
    students: 18600,
    duration: "120 hours",
    price: 109.99,
    originalPrice: 249.99,
    category: "Backend",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1679110451343-f3e151ba42f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkamFuZ28lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMHB5dGhvbnxlbnwxfHx8fDE3NTU2OTI4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Build powerful web applications with Django. Learn models, views, templates, authentication, and deployment.",
    tags: ["Django", "Python", "Web Development", "REST API"],
    lessons: [
      { id: 1, title: "Django Introduction", duration: "4h 50min", videoUrl: "django1.mp4" },
      { id: 2, title: "Models and Database", duration: "5h 58min", videoUrl: "django2.mp4" },
      { id: 3, title: "Views and Templates", duration: "5h 55min", videoUrl: "django3.mp4" },
      { id: 4, title: "User Authentication", duration: "4h 52min", videoUrl: "django4.mp4" },
      { id: 5, title: "REST API Development", duration: "6h 22min", videoUrl: "django5.mp4" },
      { id: 6, title: "Testing and Security", duration: "4h 45min", videoUrl: "django6.mp4" },
      { id: 7, title: "Deployment and Production", duration: "3h 30min", videoUrl: "django7.mp4" }
    ],
    isPaid: true
  },
  {
    id: 13,
    title: "WordPress Development Complete Guide",
    instructor: "Mike Johnson",
    rating: 4.5,
    students: 22100,
    duration: "116 hours",
    price: 69.99,
    originalPrice: 149.99,
    category: "Web Development",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1587115507681-5ef610e254fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JkcHJlc3MlMjBkZXZlbG9wbWVudCUyMHRoZW1lfGVufDF8fHx8MTc1NTY5Mjg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master WordPress from basics to custom theme and plugin development. Learn PHP, hooks, and advanced customization.",
    tags: ["WordPress", "PHP", "Theme Development", "Plugins"],
    lessons: [
      { id: 1, title: "WordPress Basics", duration: "4h 45min", videoUrl: "wp1.mp4" },
      { id: 2, title: "Theme Development", duration: "6h 25min", videoUrl: "wp2.mp4" },
      { id: 3, title: "Custom Post Types", duration: "5h 52min", videoUrl: "wp3.mp4" },
      { id: 4, title: "Plugin Development", duration: "5h 58min", videoUrl: "wp4.mp4" },
      { id: 5, title: "Advanced Customization", duration: "5h 55min", videoUrl: "wp5.mp4" },
      { id: 6, title: "WooCommerce Integration", duration: "4h 30min", videoUrl: "wp6.mp4" },
      { id: 7, title: "Performance and Security", duration: "3h 45min", videoUrl: "wp7.mp4" }
    ],
    isPaid: false
  },
  {
    id: 14,
    title: "Docker & Kubernetes DevOps",
    instructor: "Chris Martinez",
    rating: 4.6,
    students: 12900,
    duration: "117 hours",
    price: 119.99,
    originalPrice: 259.99,
    category: "DevOps",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1668854096784-3ce7679fa841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2NrZXIlMjBrdWJlcm5ldGVzJTIwZGV2b3BzfGVufDF8fHx8MTc1NTY5Mjg1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master containerization with Docker and orchestration with Kubernetes. Learn CI/CD, microservices, and deployment strategies.",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
    lessons: [
      { id: 1, title: "Docker Fundamentals", duration: "5h 55min", videoUrl: "docker1.mp4" },
      { id: 2, title: "Container Management", duration: "4h 48min", videoUrl: "docker2.mp4" },
      { id: 3, title: "Kubernetes Basics", duration: "6h 22min", videoUrl: "k8s1.mp4" },
      { id: 4, title: "Orchestration", duration: "5h 58min", videoUrl: "k8s2.mp4" },
      { id: 5, title: "Production Deployment", duration: "5h 52min", videoUrl: "deploy1.mp4" },
      { id: 6, title: "CI/CD Pipelines", duration: "4h 45min", videoUrl: "cicd1.mp4" },
      { id: 7, title: "Monitoring and Logging", duration: "3h 30min", videoUrl: "monitor1.mp4" }
    ],
    isPaid: true
  },
  {
    id: 15,
    title: "Mobile App Development with Flutter",
    instructor: "Lisa Wang",
    rating: 4.8,
    students: 16200,
    duration: "119 hours",
    price: 109.99,
    originalPrice: 239.99,
    category: "Mobile Development",
    level: "Beginner to Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHV0dGVyJTIwbW9iaWxlJTIwYXBwJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU1NjkyODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Build beautiful cross-platform mobile apps with Flutter and Dart. Learn widgets, state management, and app deployment.",
    tags: ["Flutter", "Dart", "Mobile Development", "Cross-platform"],
    lessons: [
      { id: 1, title: "Flutter Introduction", duration: "4h 48min", videoUrl: "flutter1.mp4" },
      { id: 2, title: "Dart Programming", duration: "5h 52min", videoUrl: "dart1.mp4" },
      { id: 3, title: "Widgets & Layouts", duration: "5h 58min", videoUrl: "flutter2.mp4" },
      { id: 4, title: "State Management", duration: "6h 22min", videoUrl: "flutter3.mp4" },
      { id: 5, title: "Navigation and Routing", duration: "4h 45min", videoUrl: "flutter4.mp4" },
      { id: 6, title: "API Integration", duration: "5h 30min", videoUrl: "flutter5.mp4" },
      { id: 7, title: "App Deployment", duration: "4h 15min", videoUrl: "deploy2.mp4" }
    ],
    isPaid: true
  },

  // AI/ML & Data Science (IDs 16-20)
  {
    id: 16,
    title: "Machine Learning with Python",
    instructor: "Dr. Emma Watson",
    rating: 4.9,
    students: 28500,
    duration: "198 hours",
    price: 129.99,
    originalPrice: 299.99,
    category: "AI/ML",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
    description: "Master machine learning algorithms, data preprocessing, model evaluation, and deployment using Python and scikit-learn.",
    tags: ["Machine Learning", "Python", "Scikit-learn", "Data Analysis"],
    lessons: [
      { id: 1, title: "ML Fundamentals", duration: "5h 55min", videoUrl: "ml1.mp4" },
      { id: 2, title: "Data Preprocessing", duration: "4h 48min", videoUrl: "ml2.mp4" },
      { id: 3, title: "Supervised Learning", duration: "6h 25min", videoUrl: "ml3.mp4" },
      { id: 4, title: "Unsupervised Learning", duration: "5h 52min", videoUrl: "ml4.mp4" },
      { id: 5, title: "Model Evaluation", duration: "4h 45min", videoUrl: "ml5.mp4" },
      { id: 6, title: "Feature Engineering", duration: "5h 30min", videoUrl: "ml6.mp4" },
      { id: 7, title: "Advanced Algorithms", duration: "6h 40min", videoUrl: "ml7.mp4" },
      { id: 8, title: "Model Deployment", duration: "4h 15min", videoUrl: "ml8.mp4" }
    ],
    isPaid: true
  },
  {
    id: 17,
    title: "Data Science Complete Course",
    instructor: "Robert Kim",
    rating: 4.8,
    students: 21300,
    duration: "222 hours",
    price: 149.99,
    originalPrice: 349.99,
    category: "Data Science",
    level: "Beginner to Advanced",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    description: "Complete data science journey from data collection to visualization. Learn pandas, numpy, matplotlib, and statistical analysis.",
    tags: ["Data Science", "Pandas", "NumPy", "Statistics"],
    lessons: [
      { id: 1, title: "Data Science Introduction", duration: "4h 40min", videoUrl: "ds1.mp4" },
      { id: 2, title: "Python for Data Science", duration: "5h 58min", videoUrl: "ds2.mp4" },
      { id: 3, title: "Data Manipulation with Pandas", duration: "7h 12min", videoUrl: "ds3.mp4" },
      { id: 4, title: "Data Visualization", duration: "5h 55min", videoUrl: "ds4.mp4" },
      { id: 5, title: "Statistical Analysis", duration: "6h 25min", videoUrl: "ds5.mp4" },
      { id: 6, title: "Machine Learning Integration", duration: "6h 45min", videoUrl: "ds6.mp4" },
      { id: 7, title: "Big Data and Spark", duration: "5h 30min", videoUrl: "ds7.mp4" },
      { id: 8, title: "Real-world Projects", duration: "7h 20min", videoUrl: "ds8.mp4" }
    ],
    isPaid: true
  },
  {
    id: 18,
    title: "Deep Learning & Neural Networks",
    instructor: "Dr. Lisa Chen",
    rating: 4.7,
    students: 16800,
    duration: "124 hours",
    price: 179.99,
    originalPrice: 399.99,
    category: "AI/ML",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    description: "Master deep learning with TensorFlow and Keras. Build CNNs, RNNs, GANs, and deploy AI models in production.",
    tags: ["Deep Learning", "TensorFlow", "CNN", "Neural Networks"],
    lessons: [
      { id: 1, title: "Neural Network Basics", duration: "6h 00min", videoUrl: "dl1.mp4" },
      { id: 2, title: "TensorFlow & Keras", duration: "5h 55min", videoUrl: "dl2.mp4" },
      { id: 3, title: "Convolutional Neural Networks", duration: "7h 10min", videoUrl: "dl3.mp4" },
      { id: 4, title: "Recurrent Neural Networks", duration: "6h 25min", videoUrl: "dl4.mp4" },
      { id: 5, title: "Advanced Architectures", duration: "8h 00min", videoUrl: "dl5.mp4" },
      { id: 6, title: "Computer Vision Projects", duration: "6h 45min", videoUrl: "dl6.mp4" },
      { id: 7, title: "NLP and Text Processing", duration: "5h 30min", videoUrl: "dl7.mp4" },
      { id: 8, title: "Model Deployment", duration: "4h 20min", videoUrl: "dl8.mp4" }
    ],
    isPaid: true
  },

  // UI/UX Design (IDs 19-20)
  {
    id: 19,
    title: "UI/UX Design Masterclass",
    instructor: "Maria Santos",
    rating: 4.9,
    students: 19200,
    duration: "165 hours",
    price: 109.99,
    originalPrice: 249.99,
    category: "Design",
    level: "Beginner to Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    description: "Learn modern UI/UX design principles, user research, prototyping, and design systems using Figma and Adobe XD.",
    tags: ["UI Design", "UX Design", "Figma", "Prototyping"],
    lessons: [
      { id: 1, title: "Design Fundamentals", duration: "4h 45min", videoUrl: "ux1.mp4" },
      { id: 2, title: "User Research", duration: "5h 20min", videoUrl: "ux2.mp4" },
      { id: 3, title: "Wireframing & Prototyping", duration: "5h 55min", videoUrl: "ux3.mp4" },
      { id: 4, title: "Visual Design", duration: "6h 00min", videoUrl: "ux4.mp4" },
      { id: 5, title: "Design Systems", duration: "4h 48min", videoUrl: "ux5.mp4" },
      { id: 6, title: "Mobile Design Patterns", duration: "5h 30min", videoUrl: "ux6.mp4" },
      { id: 7, title: "Usability Testing", duration: "4h 25min", videoUrl: "ux7.mp4" },
      { id: 8, title: "Portfolio Development", duration: "3h 45min", videoUrl: "ux8.mp4" }
    ],
    isPaid: true
  },
  {
    id: 20,
    title: "Graphic Design & Branding",
    instructor: "David Wilson",
    rating: 4.6,
    students: 15400,
    duration: "112 hours",
    price: 89.99,
    originalPrice: 199.99,
    category: "Design",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1655156871717-ccda8ae8274c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwYnJhbmRpbmd8ZW58MXx8fHwxNzU1NjkyODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master graphic design principles, typography, color theory, and create stunning brand identities using Adobe Creative Suite.",
    tags: ["Graphic Design", "Branding", "Adobe", "Typography"],
    lessons: [
      { id: 1, title: "Design Principles", duration: "4h 42min", videoUrl: "gd1.mp4" },
      { id: 2, title: "Typography Basics", duration: "3h 38min", videoUrl: "gd2.mp4" },
      { id: 3, title: "Color Theory", duration: "4h 45min", videoUrl: "gd3.mp4" },
      { id: 4, title: "Logo Design", duration: "5h 55min", videoUrl: "gd4.mp4" },
      { id: 5, title: "Brand Identity", duration: "5h 52min", videoUrl: "gd5.mp4" },
      { id: 6, title: "Print Design", duration: "4h 30min", videoUrl: "gd6.mp4" },
      { id: 7, title: "Digital Design", duration: "3h 45min", videoUrl: "gd7.mp4" }
    ],
    isPaid: false
  },

  // Cybersecurity (IDs 21-22)
  {
    id: 21,
    title: "Cybersecurity Fundamentals",
    instructor: "Marcus Thompson",
    rating: 4.8,
    students: 12500,
    duration: "176 hours",
    price: 119.99,
    originalPrice: 279.99,
    category: "Cybersecurity",
    level: "Beginner to Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    description: "Learn ethical hacking, network security, cryptography, and incident response. Prepare for cybersecurity certifications.",
    tags: ["Cybersecurity", "Ethical Hacking", "Network Security", "Cryptography"],
    lessons: [
      { id: 1, title: "Cybersecurity Overview", duration: "5h 50min", videoUrl: "cyber1.mp4" },
      { id: 2, title: "Network Security", duration: "6h 15min", videoUrl: "cyber2.mp4" },
      { id: 3, title: "Ethical Hacking", duration: "7h 25min", videoUrl: "cyber3.mp4" },
      { id: 4, title: "Cryptography", duration: "5h 48min", videoUrl: "cyber4.mp4" },
      { id: 5, title: "Incident Response", duration: "5h 52min", videoUrl: "cyber5.mp4" },
      { id: 6, title: "Vulnerability Assessment", duration: "6h 30min", videoUrl: "cyber6.mp4" },
      { id: 7, title: "Security Compliance", duration: "4h 40min", videoUrl: "cyber7.mp4" }
    ],
    isPaid: true
  },
  {
    id: 22,
    title: "Penetration Testing Complete Guide",
    instructor: "Sarah Mitchell",
    rating: 4.7,
    students: 8900,
    duration: "120 hours",
    price: 159.99,
    originalPrice: 349.99,
    category: "Cybersecurity",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1690547228166-d7202e7a40b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5ldHJhdGlvbiUyMHRlc3RpbmclMjBzZWN1cml0eXxlbnwxfHx8fDE3NTU2OTI4MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master penetration testing methodologies, tools, and techniques. Learn to identify and exploit vulnerabilities ethically.",
    tags: ["Penetration Testing", "Vulnerability Assessment", "Kali Linux", "Security Tools"],
    lessons: [
      { id: 1, title: "Pen Testing Methodology", duration: "5h 58min", videoUrl: "pen1.mp4" },
      { id: 2, title: "Information Gathering", duration: "5h 52min", videoUrl: "pen2.mp4" },
      { id: 3, title: "Vulnerability Scanning", duration: "6h 00min", videoUrl: "pen3.mp4" },
      { id: 4, title: "Exploitation Techniques", duration: "7h 12min", videoUrl: "pen4.mp4" },
      { id: 5, title: "Post-Exploitation", duration: "5h 45min", videoUrl: "pen5.mp4" },
      { id: 6, title: "Web Application Testing", duration: "6h 30min", videoUrl: "pen6.mp4" },
      { id: 7, title: "Reporting & Documentation", duration: "4h 25min", videoUrl: "pen7.mp4" }
    ],
    isPaid: true
  },

  // Computer Networks (ID 23)
  {
    id: 23,
    title: "Computer Networks & Protocol Analysis",
    instructor: "Dr. James Miller",
    rating: 4.6,
    students: 11200,
    duration: "118 hours",
    price: 99.99,
    originalPrice: 229.99,
    category: "Computer Networks",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG5ldHdvcmtpbmclMjBwcm90b2NvbHxlbnwxfHx8fDE3NTU2OTI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Understand network architectures, protocols, routing, switching, and troubleshooting. Master TCP/IP, OSI model, and more.",
    tags: ["Networking", "TCP/IP", "OSI Model", "Routing"],
    lessons: [
      { id: 1, title: "Network Fundamentals", duration: "5h 55min", videoUrl: "net1.mp4" },
      { id: 2, title: "OSI Model", duration: "4h 48min", videoUrl: "net2.mp4" },
      { id: 3, title: "TCP/IP Protocol Suite", duration: "6h 22min", videoUrl: "net3.mp4" },
      { id: 4, title: "Routing & Switching", duration: "5h 58min", videoUrl: "net4.mp4" },
      { id: 5, title: "Network Troubleshooting", duration: "5h 50min", videoUrl: "net5.mp4" },
      { id: 6, title: "Wireless Networks", duration: "4h 45min", videoUrl: "net6.mp4" },
      { id: 7, title: "Network Security", duration: "3h 30min", videoUrl: "net7.mp4" }
    ],
    isPaid: true
  },

  // Databases (IDs 24-25)
  {
    id: 24,
    title: "SQL Database Mastery",
    instructor: "Anna Rodriguez",
    rating: 4.8,
    students: 23400,
    duration: "144 hours",
    price: 79.99,
    originalPrice: 179.99,
    category: "Database",
    level: "Beginner to Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    description: "Master SQL from basics to advanced queries. Learn database design, optimization, stored procedures, and administration.",
    tags: ["SQL", "Database Design", "MySQL", "PostgreSQL"],
    lessons: [
      { id: 1, title: "SQL Fundamentals", duration: "4h 45min", videoUrl: "sql1.mp4" },
      { id: 2, title: "Advanced Queries", duration: "5h 52min", videoUrl: "sql2.mp4" },
      { id: 3, title: "Database Design", duration: "5h 58min", videoUrl: "sql3.mp4" },
      { id: 4, title: "Stored Procedures", duration: "4h 48min", videoUrl: "sql4.mp4" },
      { id: 5, title: "Performance Optimization", duration: "5h 55min", videoUrl: "sql5.mp4" },
      { id: 6, title: "Database Administration", duration: "6h 20min", videoUrl: "sql6.mp4" },
      { id: 7, title: "Real-world Projects", duration: "5h 35min", videoUrl: "sql7.mp4" }
    ],
    isPaid: false
  },
  {
    id: 25,
    title: "MongoDB & NoSQL Databases",
    instructor: "Kevin Chang",
    rating: 4.7,
    students: 16800,
    duration: "112 hours",
    price: 94.99,
    originalPrice: 209.99,
    category: "Database",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1615822508632-bedd5bd64376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2RiJTIwZGF0YWJhc2UlMjBub3NxbHxlbnwxfHx8fDE3NTU2OTI4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Learn NoSQL databases with MongoDB. Master document modeling, aggregation, indexing, and scaling strategies.",
    tags: ["MongoDB", "NoSQL", "Document Database", "Aggregation"],
    lessons: [
      { id: 1, title: "NoSQL Introduction", duration: "4h 40min", videoUrl: "mongo1.mp4" },
      { id: 2, title: "MongoDB Basics", duration: "4h 48min", videoUrl: "mongo2.mp4" },
      { id: 3, title: "Document Modeling", duration: "5h 55min", videoUrl: "mongo3.mp4" },
      { id: 4, title: "Aggregation Pipeline", duration: "5h 52min", videoUrl: "mongo4.mp4" },
      { id: 5, title: "Indexing and Performance", duration: "5h 50min", videoUrl: "mongo5.mp4" },
      { id: 6, title: "Scaling & Replication", duration: "4h 30min", videoUrl: "mongo6.mp4" },
      { id: 7, title: "MongoDB in Production", duration: "3h 45min", videoUrl: "mongo7.mp4" }
    ],
    isPaid: true
  }
];

export const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'certifications', name: 'Professional Certifications' },
  { id: 'programming', name: 'Programming' },
  { id: 'frontend', name: 'Frontend Development' },
  { id: 'backend', name: 'Backend Development' },
  { id: 'ai-ml', name: 'AI & Machine Learning' },
  { id: 'data-science', name: 'Data Science' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'computer-networks', name: 'Computer Networks' },
  { id: 'database', name: 'Databases' },
  { id: 'cloud-computing', name: 'Cloud Computing' },
  { id: 'devops', name: 'DevOps' },
  { id: 'mobile-development', name: 'Mobile Development' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'crm', name: 'CRM & Sales' }
];

// Helper functions that components are expecting
export const getAllCourses = () => {
  return coursesData;
};

export const getCourseById = (id) => {
  return coursesData.find(course => course.id === parseInt(id));
};

export const getCoursesByCategory = (category) => {
  if (category === 'all') {
    return coursesData;
  }
  if (category === 'certifications') {
    return coursesData.filter(course => course.certification);
  }
  return coursesData.filter(course => 
    course.category.toLowerCase() === category.toLowerCase()
  );
};

export const searchCourses = (query) => {
  if (!query) return coursesData;
  
  const lowercaseQuery = query.toLowerCase();
  return coursesData.filter(course =>
    course.title.toLowerCase().includes(lowercaseQuery) ||
    course.instructor.toLowerCase().includes(lowercaseQuery) ||
    course.description.toLowerCase().includes(lowercaseQuery) ||
    course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    course.category.toLowerCase().includes(lowercaseQuery) ||
    (course.certification && course.certification.toLowerCase().includes(lowercaseQuery))
  );
};

// Helper function to get certification courses
export const getCertificationCourses = () => {
  return coursesData.filter(course => course.certification);
};

// Helper function to get regular courses (non-certification)
export const getRegularCourses = () => {
  return coursesData.filter(course => !course.certification);
};