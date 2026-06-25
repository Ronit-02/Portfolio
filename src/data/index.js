import SoundscapeAppMockup from "../images/soundscape/mockup.png";
import SoundscapeAnalyzeScreen from "../images/soundscape/analyze-screen.png";
import SoundscapePlayScreen from "../images/soundscape/play-screen.png";

import InkRiderAppMockup from "../images/ink-rider/mockup.png";
import InkRiderCollectionsPage from "../images/ink-rider/collections-page.png";
import InkRiderTrendingPage from "../images/ink-rider/trending-page.png";

import ArtisticallySearchPage from "../images/artistically/search-page.png";
import ArtisticallyProductPage from "../images/artistically/product-page.png";
import ArtisticallyCartPage from "../images/artistically/cart-page.png";
import ArtisticallyAppMockup from "../images/artistically/mockup-2.png";

import FoodBlogCover from "../images/blogs/food-blog.jpg";
import MountainBlogCover from "../images/blogs/mountain-blog.webp";
import MinimalismBlogCover from "../images/blogs/minimalism-blog.webp";

export const projects = [
  {
    id: 1,
    title: "Soundscape",
    subtitle: "Moment-Aware Music Recommendation App",
    category: "Mobile",
    service: "React Native + FastAPI + Redis",
    year: "2024",
    github: "",
    image: SoundscapeAppMockup,
    intro: "A music companion that understands context and not just your mood, but your moment. Soundscape generates hyper-personalized playlists by fusing time-of-day, location signals, listening history, and real-time feedback.",
    design: {
      problem: "Existing music apps treat recommendation as a static preference problem. They ask 'what do you like?' but never 'what do you need right now?' A gym playlist at 11 PM feels wrong. A chill lo-fi set during a morning run misses the mark.",
      solution: "We designed a 'Vibe Detection' flow which uses a swipeable card interface where users select from ambient signal cards (Morning Focus, Deep Work, Post-Gym, Late Night) rather than genres. This removes cognitive load and maps human states to musical qualities.",
      uxDecisions: [
        { title: "Dark immersive theme", desc: "Music is an intimate experience. Light mode felt clinical. We chose near-black backgrounds with red accent to evoke the feel of a concert hall or late-night studio." },
        { title: "Floating navigation", desc: "Bottom nav tabs interrupt the listening state. A floating pill nav stays out of the way but is always reachable. Inspired by how AirPods controls live just a long press away." },
        { title: "Haptic feedback moments", desc: "Every playlist generation triggers a subtle haptic pulse. Physical feedback signals that something real just happened, your moment has been understood." },
      ],
      screens: [
        { label: "Analyze", image: SoundscapeAnalyzeScreen },
        { label: "Play", image: SoundscapePlayScreen },
      ],
    },
    code: {
      why: "React Native was chosen over Flutter for its JavaScript ecosystem alignment. The recommendation logic is shared with a web dashboard via a monorepo setup. FastAPI on the backend because Python's ML library support is unmatched and FastAPI's async handlers handle concurrent playlist requests without blocking.",
      architecture: "The system is split into three services: an Ingestion Service that captures listening events and context signals, a Recommendation Engine running a hybrid collaborative + content-based model, and a Delivery Layer that caches results in Redis for < 200ms response times on repeated requests.",
      techChoices: [
        { tech: "FastAPI", reason: "Async-first, Pydantic validation out of the box, auto-generated OpenAPI docs. Deployed 3× faster than a Django equivalent in our prototype." },
        { tech: "PostgreSQL + Redis", reason: "Postgres for durable user and listening history. Redis for ephemeral playlist cache, TTL of 30 min per session context. No stale recommendations." },
        { tech: "React Native + Expo", reason: "Expo's managed workflow eliminated 80% of native config. Over-the-air updates meant we could push recommendation model improvements without an App Store review cycle." },
        { tech: "Spotify API", reason: "Full access to audio features (tempo, valence, energy, danceability) per track which forms the actual numerical backbone of the recommendation model." },
      ],
      challenges: [
        { title: "Cold start problem", desc: "New users have no listening history. Solved with a 3-question onboarding flow that maps answers to a seed vector, letting the model start with a reasonable prior." },
        { title: "Latency at scale", desc: "Playlist generation on first request hit 800ms. Redis caching of pre-computed user vectors dropped this to 180ms for 90% of requests." },
      ],
      stack: ["React Native", "FastAPI", "PostgreSQL", "Redis"],
    },
  },
  {
    id: 2,
    title: "Ink Rider",
    subtitle: "Content Publishing Platform",
    category: "Web",
    service: "React + Express + MongoDB",
    year: "2024",
    github: "",
    image: InkRiderAppMockup,
    intro: "The ultimate writing and publishing platform designed to elevate your creativity and reading experience.",
    design: {
      problem: "Most content platforms optimize for engagement at the cost of the writer. Algorithms bury niche content. Monetization is opaque. Writers don't know who actually read their work or why it resonated.",
      solution: "Ink Rider is a next-generation publishing platform that connects writers and readers through creativity, personalization, and meaningful engagement. Writers can craft content using powerful editing tools, participate in competitions to gain recognition, and share their perspectives on trending topics requested by readers. Readers discover content tailored to their interests, enjoy quick and engaging reads, and interact directly with writers to explore diverse viewpoints on the topics that matter most to them.",
      uxDecisions: [
        { title: "Rich Text Editor", desc: "Inspired by Notion, the platform features a rich text editor with custom styling options." },
        { title: "Highlight-to-comment", desc: "Inline comments live next to the paragraph they reference, not in a separate thread. Readers annotate in context, writers see exactly what landed." },
        { title: "Genre tagging as personality", desc: "Tags aren't metadata, they're displayed as large pills with custom color coding per genre, making a post's identity immediately legible before you read a word." },
      ],
      screens: [
        { label: "Trending", image: InkRiderTrendingPage },
        { label: "Collections", image: InkRiderCollectionsPage },
      ],
    },
    code: {
      why: "Node + Express for the API because the team was already JavaScript-native and we wanted to share validation schemas between client and server via a shared types package. MongoDB was chosen over Postgres because content structure (posts, nested comments, tags) is document-shaped no FK joins needed.",
      architecture: "Three-tier architecture: React SPA with Redux Toolkit for client state, Express REST API with JWT auth middleware, MongoDB Atlas with a separate read replica for analytics queries. React Query handles server state and automatic background refetching.",
      techChoices: [
        { tech: "MongoDB", reason: "Content posts are naturally document-shaped variable field sets, nested comment trees. Mongo's flexible schema let us iterate on the post model 6 times in month one without migrations." },
        { tech: "Redux Toolkit", reason: "Global state for auth, draft posts, and notification count. RTK's createSlice cut boilerplate by ~60% vs raw Redux. RTK Query handled the feed pagination layer." },
        { tech: "React Query", reason: "Stale-while-revalidate strategy for the feed users see cached posts instantly, fresh data loads in background. Perceived load time dropped by 40%." },
        { tech: "JWT + Refresh Tokens", reason: "Short-lived access tokens (15 min) with httpOnly cookie refresh tokens. XSS-resistant auth without sacrificing UX, silent token refresh is invisible to the user." },
      ],
      challenges: [
        { title: "Real-time notifications", desc: "Polling every 5s was wasteful. Implemented Server-Sent Events (SSE) for a persistent one-way channel lighter than WebSockets for a read-heavy notification stream." },
        { title: "Rich text editor", desc: "Quill.js was too heavy. Tiptap (ProseMirror-based) gave us a headless editor we could style completely from scratch, matching the editorial design system." },
      ],
      stack: ["React", "Redux Toolkit", "React Query", "Node.js", "Express", "MongoDB", "JWT", "Tiptap"],
    },
  },
  {
    id: 3,
    title: "Artistically",
    subtitle: "Modern Art E-Commerce Platform",
    category: "Web",
    service: "Next",
    year: "2025",
    github: "",
    image: ArtisticallyAppMockup,
    intro: "A modern art e-commerce platform for discovering, exploring, and purchasing original artwork. Artistically connects collectors with emerging artists, providing a curated experience that emphasizes the story behind each piece.",
    design: {
      problem: "Most online art marketplaces prioritize transactions over discovery, making it difficult for emerging artists to showcase their work and for collectors to find pieces that resonate with their personal taste. The challenge was to create an experience that felt more like exploring a curated gallery than browsing a traditional e-commerce store.",

      solution: "Artistically combines immersive artwork presentation with seamless shopping functionality. Large visual previews, clean layouts, and thoughtful storytelling help users connect with artists and their work before making a purchase. The platform balances aesthetics with usability to encourage exploration and discovery.",

      uxDecisions: [
        {
          title: "Artwork-first browsing",
          desc: "Minimal UI chrome and large image previews keep the focus on the artwork, allowing users to experience pieces without distractions."
        },
        {
          title: "Artist storytelling",
          desc: "Each artwork includes artist information, inspiration, and creative background to help collectors build a deeper connection with the piece."
        },
        {
          title: "Streamlined purchase journey",
          desc: "From discovery to checkout, the buying process is simplified to reduce friction while maintaining a premium gallery-like experience."
        }
      ],

      screens: [
        { label: "Discover", image: ArtisticallySearchPage },
        { label: "Artwork Details", image: ArtisticallyProductPage },
        { label: "Cart & Checkout", image: ArtisticallyCartPage }
      ]
      },
    code: {
      why: "Next.js was selected to deliver fast page loads, SEO-friendly product pages, and a smooth user experience for artwork discovery. Server-side rendering helps artwork and artist pages rank better in search engines while maintaining excellent performance.",

      architecture: "The application follows a component-driven architecture with reusable UI elements and centralized state management. Product, artist, and cart data are fetched efficiently to ensure responsive navigation and a seamless shopping experience across devices.",

      techChoices: [
        {
          tech: "Next.js",
          reason: "Provides server-side rendering, image optimization, and routing out of the box, making it ideal for content-rich e-commerce experiences."
        },
        {
          tech: "React",
          reason: "Enabled the creation of reusable components and interactive user interfaces while keeping the codebase maintainable."
        },
        {
          tech: "Tailwind CSS",
          reason: "Accelerated UI development and allowed precise control over the visual design while maintaining consistency across pages."
        },
        {
          tech: "Prisma",
          reason: "Simplified database access and management, providing type-safe queries and migrations for the underlying database."
        }
      ],

      challenges: [
        {
        title: "High-quality artwork presentation",
        desc: "Artwork images needed to look sharp without negatively impacting performance. Image optimization, lazy loading, and responsive sizing were implemented to balance quality and speed."
        },
        {
        title: "Product discovery experience",
        desc: "Large art catalogs can feel overwhelming. Filtering, categorization, and search functionality were designed to help users quickly find artwork matching their interests."
        }
      ],

      stack: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Prisma",
      ]
    }
  },
];

export const blogs = [
  {
    id: 1,
    title: "Best Food I had so far!",
    category: "Travel",
    readTime: "7 min read",
    date: "17 February 2024",
    image: FoodBlogCover,
    content: "Food has the magical ability to evoke memories, bring people together, and create unforgettable experiences. Throughout my travels and culinary adventures, I have encountered numerous dishes that tantalized my taste buds and left a lasting impression. However, a few stand out as the best food I've had so far, each telling its own story of flavour, culture, and craftsmanship.",
  },
  {
    id: 2,
    title: "A Place near the Mountains",
    category: "Travel",
    readTime: "15 min read",
    date: "10 December 2023",
    image: MountainBlogCover,
    content: "There's something profoundly humbling about standing at the foot of a mountain. The sheer scale, the ancient permanence, the way clouds drift lazily around distant peaks.",
  },
  {
    id: 3,
    title: "The Art of Minimalist Design",
    category: "Technical",
    readTime: "8 min read",
    date: "5 November 2023",
    image: MinimalismBlogCover,
    content: "Minimalism in design isn't about removing elements but it's about keeping only what serves a purpose. Every pixel should earn its place.",
  },
];

export const photos = [
  { id: 1, year: "2025", image: "/gallery/image-1.jpg", alt: "Architectural Mania" },
  { id: 2, year: "2024", image: "/gallery/image-2.jpg", alt: "Architectural Mania" },
  { id: 3, year: "2024", image: "/gallery/image-3.jpg", alt: "Architectural Mania" },
  { id: 4, year: "2025", image: "/gallery/image-4.jpg", alt: "Beach" },
  { id: 5, year: "2023", image: "/gallery/image-5.jpg", alt: "Old Skool Bike" },
  { id: 6, year: "2023", image: "/gallery/image-6.jpg", alt: "Night Life" },
  { id: 7, year: "2025", image: "/gallery/image-7.jpg", alt: "Phonebooth" },
  { id: 8, year: "2023", image: "/gallery/image-8.jpg", alt: "Monument" },
  { id: 9, year: "2023", image: "/gallery/image-9.jpg", alt: "Cruise" },
  { id: 10, year: "2026", image: "/gallery/image-10.jpg", alt: "Skateboard" },
  { id: 11, year: "2026", image: "/gallery/image-11.jpg", alt: "Evening sky" },
  { id: 12, year: "2023", image: "/gallery/image-12.jpg", alt: "Gurudwara" },
];

export const experience = [
  { id: 1, year: "2024 – Present", title: "Technology Associate", company: "ZS ASSOCIATES", side: "left" },
  { id: 2, year: "2023", title: "Technical Head", company: "OPTICA", side: "right" },
  { id: 3, year: "2022", title: "UI/UX Designer", company: "Market Mela", side: "left" },
  { id: 4, year: "2021", title: "Community Lead", company: "Cosmic Coders", side: "right" },
];

export const faqs = [
  { q: "What is the average timeframe for branding work?", a: "Typically 2-4 weeks depending on scope and complexity." },
  { q: "How many years of experience do you have as a developer?", a: "Around 2 years of professional experience, with 4+ years of building side projects." },
  { q: "Do you take on freelance projects?", a: "Yes, open to freelance. Reach out via the contact page." },
  { q: "What tools do you use for design?", a: "Primarily Figma for UI/UX, React for frontend development and Node.js for backend development." },
];

export const navItems = [
  { id: "home",       label: "Home"       },
  { id: "about",      label: "About"      },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects"   },
  { id: "blog",       label: "Blog"       },
  { id: "photos",     label: "Photos"     },
  { id: "contact",    label: "Contact"    },
  { id: "settings",   label: "Settings"   },
];
