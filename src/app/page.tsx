"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

type Lesson = {
  id: string;
  title: string;
  description: string;
  project: string;
  skills: string[];
  href?: string;
};

type CurriculumSection = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

const curriculum: CurriculumSection[] = [
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
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Τύποι, interfaces, generics και πιο ασφαλής JavaScript σε frontend και backend.",
        project: "Typed task model και API response types.",
        skills: ["types", "interfaces", "generics"],
      },
      {
        id: "testing-debugging",
        title: "Testing & Debugging",
        description: "Πώς βρίσκεις bugs και πώς γράφεις βασικά tests.",
        project: "Tested utility functions.",
        skills: ["debugger", "unit tests", "errors"],
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
      },
      {
        id: "nextjs-app-router",
        title: "Next.js App Router + TypeScript",
        description: "Pages, layouts, routing, server/client components, metadata και typed data loading.",
        project: "Multi-page portfolio app.",
        skills: ["routing", "layouts", "server components"],
      },
      {
        id: "frontend-testing",
        title: "React Testing",
        description: "Component tests, user flows και βασική κάλυψη με React Testing Library ή Playwright.",
        project: "Tested form and todo interactions.",
        skills: ["RTL", "Playwright", "user flows"],
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
      },
      {
        id: "rest-apis",
        title: "REST APIs",
        description: "HTTP methods, status codes, request/response και API contracts.",
        project: "CRUD API contract.",
        skills: ["GET", "POST", "status codes"],
      },
      {
        id: "graphql-basics",
        title: "GraphQL Basics",
        description: "Queries, mutations και πότε έχει νόημα σε σχέση με REST.",
        project: "Simple GraphQL schema.",
        skills: ["schema", "queries", "mutations"],
      },
      {
        id: "api-integrations",
        title: "API Integrations",
        description: "Σύνδεση με τρίτα APIs, auth headers, retries, rate limits και error handling.",
        project: "External API dashboard.",
        skills: ["fetch", "auth headers", "rate limits"],
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
      },
      {
        id: "authentication",
        title: "Authentication & Authorization",
        description: "Login, sessions, JWT/OAuth και προστατευμένες σελίδες.",
        project: "Protected dashboard.",
        skills: ["sessions", "JWT", "OAuth"],
      },
      {
        id: "web-security",
        title: "Web Security Basics",
        description: "XSS, CSRF, secrets, validation και ασφαλή server-side όρια.",
        project: "Secure form handling.",
        skills: ["XSS", "CSRF", "validation"],
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
      },
      {
        id: "docker-ci-cd",
        title: "Docker & CI/CD",
        description: "Containers, GitHub Actions, automated checks και release workflow.",
        project: "Dockerized app with CI.",
        skills: ["Docker", "GitHub Actions", "CI/CD"],
      },
      {
        id: "observability",
        title: "Logs, Monitoring & Observability",
        description: "Διαβάζεις logs, παρακολουθείς errors και καταλαβαίνεις τι συμβαίνει στην παραγωγή.",
        project: "App with structured logs and error tracking.",
        skills: ["logs", "Sentry", "metrics"],
      },
      {
        id: "capstone",
        title: "Fullstack Capstone",
        description: "Συνδυάζεις frontend, backend, database, auth και deploy.",
        project: "Production-style fullstack app.",
        skills: ["frontend", "backend", "database"],
      },
    ],
  },
];

const allLessons = curriculum.flatMap((section) => section.lessons);
const readyLessons = allLessons.filter((lesson) => lesson.href);

export default function Home() {
  const { isCompleted, isLoaded } = useProgress();
  const completedCount = isLoaded ? readyLessons.filter((lesson) => isCompleted(lesson.id)).length : 0;
  const plannedCount = allLessons.length - readyLessons.length;
  const progressPercent = readyLessons.length > 0 ? Math.round((completedCount / readyLessons.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center py-10">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-600">Learn by building</p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
          Ο δρόμος σου για <span className="text-blue-600">Fullstack Developer</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Το πρόγραμμα είναι χωρισμένο σε καθαρές κατηγορίες: πρώτα HTML, CSS και JavaScript,
          μετά workflow, React, backend, APIs, data, auth και deploy.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Πρόοδος διαθέσιμων μαθημάτων</p>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{progressPercent}%</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Ολοκληρωμένα</p>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">
            {completedCount}/{readyLessons.length}
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Σε σχεδιασμό</p>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{plannedCount}</p>
        </div>
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h3 className="text-lg font-bold text-blue-950">Πώς δουλεύει κάθε κατηγορία</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {["Μικρή θεωρία", "Live κώδικας", "Checklist", "Mini project"].map((item) => (
            <div key={item} className="rounded-lg bg-white p-4 text-sm font-semibold text-blue-900">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {curriculum.map((section, sectionIndex) => {
          const readyInSection = section.lessons.filter((lesson) => lesson.href).length;
          const completedInSection = section.lessons.filter((lesson) => lesson.href && isLoaded && isCompleted(lesson.id)).length;
          const plannedInSection = section.lessons.length - readyInSection;

          return (
            <article key={section.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 bg-gray-50 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-blue-600">Ενότητα {sectionIndex + 1}</p>
                    <h3 className="mt-1 text-2xl font-extrabold text-gray-900">{section.title}</h3>
                    <p className="mt-2 max-w-2xl text-gray-600">{section.description}</p>
                  </div>
                  <div className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                    {readyInSection > 0 ? `${completedInSection}/${readyInSection} ολοκληρωμένα` : "Preview ενότητας"}
                    {plannedInSection > 0 ? ` · ${plannedInSection} σε σχεδιασμό` : ""}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {section.lessons.map((lesson, lessonIndex) => {
                  const completed = Boolean(lesson.href && isLoaded && isCompleted(lesson.id));

                  return (
                    <div key={lesson.id} className={completed ? "bg-green-50/50 p-5" : "p-5"}>
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                                completed
                                  ? "bg-green-500 text-white"
                                  : lesson.href
                                    ? "bg-blue-600 text-white"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {completed ? "✓" : lessonIndex + 1}
                            </span>
                            <h4 className="text-lg font-bold text-gray-900">{lesson.title}</h4>
                          </div>
                          <p className="mt-2 text-gray-600">{lesson.description}</p>
                          <p className="mt-2 text-sm font-medium text-gray-700">Mini project: {lesson.project}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {lesson.skills.map((skill) => (
                              <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          {lesson.href ? (
                            <Link
                              href={lesson.href}
                              className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-medium transition-colors ${
                                completed
                                  ? "border border-green-200 bg-white text-green-700 hover:bg-green-50"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                            >
                              {completed ? "Επανάληψη" : "Άνοιγμα"}
                            </Link>
                          ) : (
                            <span className="inline-flex items-center justify-center rounded-lg bg-amber-50 px-5 py-2.5 font-medium text-amber-700">
                              Σε σχεδιασμό
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
