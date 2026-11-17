// EDIT THIS FILE to update your personal content. No build step required.
// Put photos and video in media/, then use paths like "media/japan.jpg".
window.SITE_CONTENT = {
  about: "I’m Ethan, a software engineer based in Riverside, California. My work has taken me through automotive AI, full-stack applications, and the integrations that connect them. This is also a home for the things outside work: what I’m reading, where I’ve been, and what I’m playing.",
  email: "ethanortega316@gmail.com",
  // Add full profile URLs here when ready.
  github: "https://github.com/ethan-g-ortega",
  linkedin: "",
  books: [
    { title: "The shelf is taking shape", author: "Book notes coming soon", note: "" }
    // Example: , { title: "Your book title", author: "Author name", note: "What stayed with you." }
  ],
  places: [
    { name: "Chiang Mai, Thailand — Sticky Falls", image: "media/travel-forest-original.jpeg", caption: "", orientation: "portrait" },
    { name: "Krabi, Thailand", image: "media/travel-boat-original.jpeg", caption: "", orientation: "sideways" }
    // Replace with { name: "Place name", image: "media/trip.jpg", caption: "Your memory" }
  ],
  // A local MP4/WebM path or direct HTTPS video URL. Leave blank for the placeholder.
  drummingVideo: "media/drums-please-ethan.mp4",
  videoCaption: "first drum recital 3 months into learning drums!",
  career: [
  {
    "company": "PAM",
    "path": "/experience/pam",
    "role": "Software Engineer, Integrations",
    "dates": "Mar 2026 – Sep 2026",
    "summary": "Built and operated the integrations connecting an automotive voice AI platform to dealership systems. Owned work across TypeScript adapters, scheduling configuration, production debugging, and evaluation tooling at a startup serving 500+ dealerships.",
    "metrics": [
      [
        "6",
        "DMS providers unified"
      ],
      [
        "30+",
        "live scheduling configurations"
      ],
      [
        "~114",
        "locations in a booking-failure investigation"
      ]
    ],
    "highlights": [
      [
        "One interface across six providers",
        "Unified Tekion, Xtime, myKaarma, Dealer-FX/wiAdvisor, Evenflow, and Reynolds behind canonical TypeScript integrations. Mapped provider-specific APIs and data into shared customer-lookup and appointment workflows."
      ],
      [
        "Reusable scheduling, not per-client code",
        "Translated business requirements into 30+ live configurations for service eligibility, lead times, transportation, and advisor routing. Partnered with API/webhook vendors, Customer Success, and onboarding to resolve access limits and clarify behavior."
      ],
      [
        "Production investigation through prevention",
        "Root-caused recurring booking failures affecting approximately 114 dealership locations in 30 days. Shipped a shared configuration fix and a guard against recurrence, validating changes with feature flags and canary rollouts."
      ],
      [
        "Ownership beyond the code",
        "Owned triage automation from scoping through impact measurement. Built root-cause investigation tools, expanded CloudWatch logs and metrics across DMS operations and LLM calls, and equipped Ops with troubleshooting runbooks."
      ]
    ],
    "storyTitle": "Engineering judgment: evaluate before rolling out",
    "story": "Ran LLM shadow evaluations that identified a model with approximately 74% lower inference cost. Assessed latency and judge-calibration tradeoffs before rollout, and built a rubric-based CI evaluation harness to catch service-matching regressions. The 74% figure is an evaluation finding, not a claim of realized production savings.",
    "stack": "TypeScript · REST APIs / webhooks · AWS Lambda · DynamoDB · CloudWatch · Vitest · Feature flags · LLM evaluations"
  },
  {
    "company": "STELLA Automotive AI",
    "path": "/experience/stella",
    "role": "Software Engineer",
    "dates": "Sep 2024 – Mar 2026 · joined in business development; transitioned to engineering in 2025",
    "summary": "Moved from customer-facing business development into engineering, building the interfaces and operational tools behind an automotive AI platform. Connected React/TypeScript workflows to APIs and relational databases, with an emphasis on safe operations and production troubleshooting.",
    "metrics": [
      [
        "4",
        "React / TypeScript workflows"
      ],
      [
        "Full stack",
        "UI → API → PostgreSQL"
      ],
      [
        "Safer Ops",
        "validated, auditable configuration"
      ]
    ],
    "highlights": [
      [
        "Made configuration changes safer",
        "Replaced direct production database edits with a configuration editor featuring input validation, backups, and audit logs. Enabled Ops to manage settings through a controlled, traceable workflow."
      ],
      [
        "Shipped four connected portal workflows",
        "Delivered CSV imports, bulk record creation, phone directories, and notifications in React and TypeScript, integrating the interfaces with backend APIs and databases."
      ],
      [
        "Made dealership performance visible",
        "Built full-stack reporting tools with Python, FastAPI, SQLAlchemy, and PostgreSQL, giving engineering and Ops visibility into dealership call activity and performance."
      ],
      [
        "Debugged the whole workflow",
        "Reproduced production API and voice-agent failures using Datadog, Postman, and database audits. Extended feature flags to support staged rollout and rollback of outbound automation changes."
      ]
    ],
    "storyTitle": "A representative story: from direct edits to a controlled workflow",
    "story": "The configuration editor brought validation, backups, and an audit trail into a task that previously involved direct production database edits. It connected a practical Ops need to full-stack delivery and made the change process easier to trace.",
    "stack": "React · TypeScript · Python · FastAPI · SQLAlchemy · PostgreSQL · Datadog · Postman"
  },
  {
    "company": "STELLA / the beginning",
    "path": "/experience/internship",
    "role": "Software Engineering Intern",
    "dates": "Aug 2023 – Feb 2024",
    "summary": "Built automated dealership performance reports and Slack integrations, and investigated reporting and delivery failures for operational users.",
    "highlights": [
      [
        "Automation for operational teams",
        "Connected performance reporting and Slack delivery, then investigated failures affecting the people relying on those reports."
      ]
    ],
    "storyTitle": "Education",
    "story": "B.S. Computer Science · University of California, Riverside · 2025",
    "stack": "Reporting · Integrations · Debugging"
  }
]
};
