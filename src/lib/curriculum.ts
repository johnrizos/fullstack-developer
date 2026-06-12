export type Lesson = {
  id: string;
  title: string;
  description: string;
  project: string;
  skills: string[];
  href: string;
};

export type CurriculumSection = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export const curriculum: CurriculumSection[] = [
  {
    id: "web",
    title: "Web Foundations",
    description: "Πριν γράψεις κώδικα, καταλαβαίνεις τι συμβαίνει ανάμεσα σε browser και server.",
    lessons: [
      {
        id: "web-basics",
        title: "Τι είναι το Web;",
        description: "Internet, browser, server και request/response.",
        project: "Χάρτης client-server με δικά σου λόγια.",
        skills: ["Internet", "Browser", "Server"],
        href: "/lessons/web-basics",
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Χτίζεις τη δομή, την προσβασιμότητα και το layout των πρώτων σου σελίδων.",
    lessons: [
      {
        id: "html-css",
        title: "HTML & CSS Basics",
        description: "Tags, απλή δομή σελίδας και πρώτες CSS αλλαγές.",
        project: "Προσωπική profile card.",
        skills: ["HTML tags", "CSS selectors", "Live preview"],
        href: "/lessons/html-css",
      },
      {
        id: "html-semantics",
        title: "HTML Structure & Semantics",
        description: "Semantic elements που δίνουν νόημα στη σελίδα.",
        project: "Semantic article page.",
        skills: ["header", "main", "section", "article"],
        href: "/lessons/html-semantics",
      },
      {
        id: "html-forms-accessibility",
        title: "HTML Forms & Accessibility",
        description: "Inputs, labels, buttons και βασική προσβασιμότητα.",
        project: "Accessible contact form.",
        skills: ["forms", "labels", "inputs"],
        href: "/lessons/html-forms-accessibility",
      },
      {
        id: "css-box-model",
        title: "CSS Box Model",
        description: "Margin, padding, border, width και σωστές αποστάσεις.",
        project: "Spacing card.",
        skills: ["box model", "padding", "margin", "border"],
        href: "/lessons/css-box-model",
      },
      {
        id: "css-flex-responsive",
        title: "CSS Flexbox & Responsive Layouts",
        description: "Flexbox, wrapping και responsive navigation.",
        project: "Responsive nav bar.",
        skills: ["flexbox", "gap", "wrap"],
        href: "/lessons/css-flex-responsive",
      },
      {
        id: "css-grid-layouts",
        title: "CSS Grid & Page Layouts",
        description: "Grid columns, card layouts, dashboard structure και responsive page layouts.",
        project: "Responsive dashboard grid.",
        skills: ["grid", "columns", "responsive"],
        href: "/lessons/css-grid-layouts",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Η βασική γλώσσα του fullstack path: fundamentals, DOM, async, runtime behavior και interview-level concepts.",
    lessons: [
      {
        id: "javascript-intro",
        title: "JavaScript Basics",
        description: "Variables, functions, events και πρώτη διαδραστικότητα.",
        project: "Interactive counter.",
        skills: ["variables", "functions", "events"],
        href: "/lessons/javascript-intro",
      },
      {
        id: "javascript-logic",
        title: "JavaScript Logic",
        description: "Conditions, loops και αποφάσεις στον κώδικα.",
        project: "Pass/fail score checker.",
        skills: ["if", "else", "loops"],
        href: "/lessons/javascript-logic",
      },
      {
        id: "javascript-arrays-objects",
        title: "JavaScript Arrays & Objects",
        description: "Λίστες δεδομένων, objects και rendering.",
        project: "Task list renderer.",
        skills: ["arrays", "objects", "map"],
        href: "/lessons/javascript-arrays-objects",
      },
      {
        id: "javascript-dom-forms",
        title: "JavaScript DOM, Forms & Storage",
        description: "DOM manipulation, submit events και localStorage.",
        project: "Saved notes form.",
        skills: ["DOM", "forms", "localStorage"],
        href: "/lessons/javascript-dom-forms",
      },
      {
        id: "javascript-scope-closures",
        title: "Scope, Hoisting & Closures",
        description: "Το πιο συχνό interview core: scope chains, lexical scope, hoisting και closures.",
        project: "Counter factory με closure.",
        skills: ["scope", "closures", "hoisting"],
        href: "/lessons/javascript-scope-closures",
      },
      {
        id: "javascript-this-prototypes",
        title: "this, Prototypes & Classes",
        description: "Πώς δουλεύουν το this, prototype chain, classes και object methods.",
        project: "Small user model with methods.",
        skills: ["this", "prototype", "class"],
        href: "/lessons/javascript-this-prototypes",
      },
      {
        id: "javascript-async-event-loop",
        title: "Async JavaScript & Event Loop",
        description: "Call stack, task queue, microtasks, promises, async/await και timers.",
        project: "Async timeline visualizer.",
        skills: ["event loop", "promises", "async/await"],
        href: "/lessons/javascript-async-event-loop",
      },
      {
        id: "javascript-fetch-errors",
        title: "Fetch, Errors & API Handling",
        description: "HTTP requests, try/catch, failed responses, retries και loading/error states.",
        project: "Robust API search widget.",
        skills: ["fetch", "try/catch", "error states"],
        href: "/lessons/javascript-fetch-errors",
      },
      {
        id: "javascript-modules-patterns",
        title: "Modules & Code Organization",
        description: "Imports/exports, pure functions, separation of concerns και μικρά reusable modules.",
        project: "Modular shopping cart logic.",
        skills: ["modules", "pure functions", "architecture"],
        href: "/lessons/javascript-modules-patterns",
      },
      {
        id: "javascript-interview-drills",
        title: "JavaScript Interview Drills",
        description: "Κλασικές ερωτήσεις: equality, coercion, closures, async output order και array methods.",
        project: "Interview question bank με εξηγήσεις.",
        skills: ["coercion", "output order", "array methods"],
        href: "/lessons/javascript-interview-drills",
      },
    ],
  },
  {
    id: "developer-workflow",
    title: "Developer Workflow",
    description: "Τα εργαλεία που χρειάζεσαι για να δουλεύεις σαν πραγματικός developer.",
    lessons: [
      {
        id: "git-github",
        title: "Git & GitHub",
        description: "Commits, branches, pull requests και συνεργασία σε κώδικα.",
        project: "Πρώτο repository με καθαρό README.",
        skills: ["commit", "branch", "pull request"],
        href: "/lessons/git-github",
      },
      {
        id: "agile-scrum-kanban",
        title: "Agile, Scrum & Kanban",
        description: "Πώς δουλεύουν tickets, boards, sprints, standups και acceptance criteria σε ομάδα.",
        project: "Kanban board για το capstone project.",
        skills: ["Scrum", "Kanban", "tickets"],
        href: "/lessons/agile-scrum-kanban",
      },
      {
        id: "job-ready-practice",
        title: "Job-Ready Practice & Portfolio",
        description: "Deliverables, acceptance criteria και portfolio tasks για να μετατρέψεις το roadmap σε job-ready έργα.",
        project: "Audit και portfolio plan για το capstone.",
        skills: ["portfolio", "acceptance criteria", "README"],
        href: "/lessons/job-ready-practice",
      },
      {
        id: "milestone-projects",
        title: "Milestone Projects",
        description: "Τέσσερα αυξανόμενα projects που αποδεικνύουν progression από HTML/CSS μέχρι fullstack.",
        project: "MILESTONES.md με acceptance criteria.",
        skills: ["projects", "rubrics", "portfolio"],
        href: "/lessons/milestone-projects",
      },
      {
        id: "code-review-practice",
        title: "Code Review Practice",
        description: "Πώς βρίσκεις bugs, security risks, missing validation και edge cases σε πραγματικό κώδικα.",
        project: "Self-review σε παλιό PR ή feature.",
        skills: ["review", "debugging", "quality"],
        href: "/lessons/code-review-practice",
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Τύποι, interfaces, generics και πιο ασφαλής JavaScript σε frontend και backend.",
        project: "Typed task model και API response types.",
        skills: ["types", "interfaces", "generics"],
        href: "/lessons/typescript",
      },
      {
        id: "testing-debugging",
        title: "Testing & Debugging",
        description: "Πώς βρίσκεις bugs και πώς γράφεις βασικά tests.",
        project: "Tested utility functions.",
        skills: ["debugger", "unit tests", "errors"],
        href: "/lessons/testing-debugging",
      },
    ],
  },
  {
    id: "frontend-apps",
    title: "Frontend App Development",
    description: "Μετατρέπεις HTML/CSS/JS γνώση σε React εφαρμογές με TypeScript και production patterns.",
    lessons: [
      {
        id: "react-ecosystem",
        title: "React + TypeScript",
        description: "Components, props, hooks, typed state και event handlers σε πραγματικές οθόνες.",
        project: "Typed todo app με φίλτρα.",
        skills: ["components", "props", "typed state"],
        href: "/lessons/react-ecosystem",
      },
      {
        id: "nextjs-app-router",
        title: "Next.js App Router + TypeScript",
        description: "Pages, layouts, routing, server/client components, metadata και typed data loading.",
        project: "Multi-page portfolio app.",
        skills: ["routing", "layouts", "server components"],
        href: "/lessons/nextjs-app-router",
      },
      {
        id: "frontend-testing",
        title: "React Testing",
        description: "Component tests, user flows και βασική κάλυψη με React Testing Library ή Playwright.",
        project: "Tested form and todo interactions.",
        skills: ["RTL", "Playwright", "user flows"],
        href: "/lessons/frontend-testing",
      },
    ],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    description: "Φτιάχνεις server-side λογική και endpoints που μιλάνε με το frontend.",
    lessons: [
      {
        id: "backend-node",
        title: "Node.js, Express & NestJS",
        description: "Backend server, routes, middleware και structured APIs με Express ή NestJS.",
        project: "Μικρό tasks API.",
        skills: ["routes", "JSON", "NestJS"],
        href: "/lessons/backend-node",
      },
      {
        id: "rest-apis",
        title: "REST APIs",
        description: "HTTP methods, status codes, request/response και API contracts.",
        project: "CRUD API contract.",
        skills: ["GET", "POST", "status codes"],
        href: "/lessons/rest-apis",
      },
      {
        id: "graphql-basics",
        title: "GraphQL Basics",
        description: "Queries, mutations και πότε έχει νόημα σε σχέση με REST.",
        project: "Simple GraphQL schema.",
        skills: ["schema", "queries", "mutations"],
        href: "/lessons/graphql-basics",
      },
      {
        id: "python-services",
        title: "Python Services",
        description: "FastAPI, data processing, AI helpers και background jobs δίπλα στο main app.",
        project: "Python service που δέχεται job και επιστρέφει result.",
        skills: ["FastAPI", "workers", "AI/data"],
        href: "/lessons/python-services",
      },
      {
        id: "websockets-realtime",
        title: "WebSockets & Real-Time Apps",
        description: "Persistent connections για chat, notifications, live dashboards και status updates.",
        project: "Real-time notifications ή live chat flow.",
        skills: ["WebSocket", "Socket.IO", "Redis Pub/Sub"],
        href: "/lessons/websockets-realtime",
      },
      {
        id: "api-integrations",
        title: "API Integrations",
        description: "Σύνδεση με τρίτα APIs, auth headers, retries, rate limits και error handling.",
        project: "External API dashboard.",
        skills: ["fetch", "auth headers", "rate limits"],
        href: "/lessons/api-integrations",
      },
    ],
  },
  {
    id: "architecture-system-design",
    title: "Architecture & System Design",
    description: "Μαθαίνεις πότε διαλέγεις monolith, modular monolith, microservices ή hybrid architecture.",
    lessons: [
      {
        id: "architecture-monolith-microservices",
        title: "Monolith, Microservices & Hybrid Architecture",
        description: "Πώς οργανώνεις ένα product από απλό monolith μέχρι ανεξάρτητα services.",
        project: "Architecture map για fullstack SaaS με core app και ξεχωριστά services.",
        skills: ["monolith", "microservices", "boundaries"],
        href: "/lessons/architecture-monolith-microservices",
      },
    ],
  },
  {
    id: "data-auth-security",
    title: "Data, Auth & Security",
    description: "Αποθηκεύεις δεδομένα και προστατεύεις χρήστες, routes και APIs.",
    lessons: [
      {
        id: "databases",
        title: "Databases",
        description: "SQL, NoSQL, schema design και βασικά queries.",
        project: "Persistent tasks database.",
        skills: ["SQL", "NoSQL", "schema"],
        href: "/lessons/databases",
      },
      {
        id: "redis-caching-sessions",
        title: "Redis, Caching & Sessions",
        description: "Key-value storage για cache, TTL, sessions, rate limits, queues και Pub/Sub.",
        project: "Cached API response με TTL και session lookup.",
        skills: ["Redis", "cache", "TTL"],
        href: "/lessons/redis-caching-sessions",
      },
      {
        id: "authentication",
        title: "Authentication & Authorization",
        description: "Login, sessions, JWT/OAuth και προστατευμένες σελίδες.",
        project: "Protected dashboard.",
        skills: ["sessions", "JWT", "OAuth"],
        href: "/lessons/authentication",
      },
      {
        id: "web-security",
        title: "Web Security Basics",
        description: "XSS, CSRF, secrets, validation και ασφαλή server-side όρια.",
        project: "Secure form handling.",
        skills: ["XSS", "CSRF", "validation"],
        href: "/lessons/web-security",
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Κάνεις deploy, διαβάζεις logs και οργανώνεις delivery pipeline.",
    lessons: [
      {
        id: "deployment",
        title: "Deployment & Cloud",
        description: "Build, environment variables, deploy σε Vercel/AWS/Azure/GCP και basic cloud services.",
        project: "Deploy του fullstack project.",
        skills: ["AWS", "Azure/GCP", "env vars"],
        href: "/lessons/deployment",
      },
      {
        id: "docker-ci-cd",
        title: "Docker & CI/CD",
        description: "Containers, GitHub Actions, automated checks και release workflow.",
        project: "Dockerized app with CI.",
        skills: ["Docker", "GitHub Actions", "CI/CD"],
        href: "/lessons/docker-ci-cd",
      },
      {
        id: "observability",
        title: "Logs, Monitoring & Observability",
        description: "Διαβάζεις logs, παρακολουθείς errors και καταλαβαίνεις τι συμβαίνει στην παραγωγή.",
        project: "App with structured logs and error tracking.",
        skills: ["logs", "Sentry", "metrics"],
        href: "/lessons/observability",
      },
      {
        id: "capstone",
        title: "Fullstack Capstone",
        description: "Συνδυάζεις frontend, backend, database, auth και deploy.",
        project: "Production-style fullstack app.",
        skills: ["frontend", "backend", "database"],
        href: "/lessons/capstone",
      },
      {
        id: "final-assessment",
        title: "Final Assessment",
        description: "Rubric για να κρίνεις αν το capstone είναι portfolio-ready και interview-ready.",
        project: "Self-assessment scorecard για το capstone.",
        skills: ["rubric", "capstone", "interview"],
        href: "/lessons/final-assessment",
      },
    ],
  },
];

export type LessonWithSection = Lesson & {
  sectionId: string;
  sectionTitle: string;
  sectionIndex: number;
};

export const allLessons: LessonWithSection[] = curriculum.flatMap((section, sectionIndex) =>
  section.lessons.map((lesson) => ({
    ...lesson,
    sectionId: section.id,
    sectionTitle: section.title,
    sectionIndex,
  })),
);

export function getLessonBySlug(slug: string): LessonWithSection | undefined {
  return allLessons.find((lesson) => lesson.href === `/lessons/${slug}`);
}

export function getAdjacentLessons(slug: string): {
  previous: LessonWithSection | null;
  next: LessonWithSection | null;
} {
  const index = allLessons.findIndex((lesson) => lesson.href === `/lessons/${slug}`);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}
