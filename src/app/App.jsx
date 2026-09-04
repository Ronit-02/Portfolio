import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { ThemeProvider } from "../context/ThemeContext";
import TopNav from "../components/layout/TopNav";
import BottomNav from "../components/layout/BottomNav";
import PortfolioLayerTransition from "../components/layout/PortfolioLayerTransition";

import AboutPage from "../pages/AboutPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import BlogPage from "../pages/BlogPage";
import ContactPage from "../pages/ContactPage";
import ExperiencePage from "../pages/ExperiencePage";
import HomePage from "../pages/HomePage";
import LifeHomePage from "../pages/LifeHomePage";
import PhotosPage from "../pages/PhotosPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ProjectsPage from "../pages/ProjectsPage";

const routeToPage = {
  "/": "home",
  "/about": "about",
  "/projects": "projects",
  "/experience": "experience",
  "/blog": "blog",
  "/photos": "photos",
  "/contact": "contact",
};

const pageRoutes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  experience: "/experience",
  blog: "/blog",
  photos: "/photos",
  contact: "/contact",
};

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [portfolioTransition, setPortfolioTransition] = useState(null);

  const handleNavigate = (page) => {
    navigate(pageRoutes[page] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProject = (project) => {
    navigate(`/projects/${project.id}`, { state: { project } });
    window.scrollTo({ top: 0 });
  };

  const handleSelectBlog = (blog) => {
    navigate(`/blog/${blog.id}`, { state: { blog } });
    window.scrollTo({ top: 0 });
  };

  const handleSwitchPortfolio = () => {
    if (portfolioTransition) return;

    const destination = location.pathname === "/life" ? "/" : "/life";
    const transitionKey = Date.now();

    setPortfolioTransition({
      destination,
      originLocation: {
        ...location,
        key: `portfolio-origin-${transitionKey}`,
      },
      destinationLocation: {
        ...location,
        pathname: destination,
        search: "",
        hash: "",
        state: null,
        key: `portfolio-destination-${transitionKey}`,
      },
    });
  };

  const completePortfolioTransition = () => {
    if (!portfolioTransition) return;

    navigate(portfolioTransition.destination);
    window.scrollTo({ top: 0 });

    window.setTimeout(() => {
      setPortfolioTransition(null);
    }, 190);
  };

  const renderPortfolio = (routeLocation, transitionLayer = false) => {
    const isLifeSide = routeLocation.pathname === "/life";
    const frameActivePage = (() => {
      const path = routeLocation.pathname;
      if (path.startsWith("/projects")) return "projects";
      if (path.startsWith("/blog")) return "blog";
      return routeToPage[path] || "home";
    })();

    return (
      <div className="min-h-screen bg-white font-satoshi transition-colors duration-300 dark:bg-[#0f0f0f]">
        <TopNav
          portfolioSide={isLifeSide ? "life" : "work"}
          onSwitchPortfolio={transitionLayer ? undefined : handleSwitchPortfolio}
          switchDisabled={transitionLayer || Boolean(portfolioTransition)}
        />

        <main className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={routeLocation.pathname}
              initial={transitionLayer ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Routes location={routeLocation}>
                <Route path="/" element={<HomePage />} />
                <Route path="/life" element={<LifeHomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage onSelectProject={handleSelectProject} />} />
                <Route path="/projects/:projectId" element={<ProjectDetailRoute />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/blog" element={<BlogPage onSelectBlog={handleSelectBlog} />} />
                <Route path="/blog/:blogId" element={<BlogDetailRoute />} />
                <Route path="/photos" element={<PhotosPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        {!isLifeSide && (
          <BottomNav activePage={frameActivePage} onNavigate={handleNavigate} />
        )}
      </div>
    );
  };

  return (
    <>
      {renderPortfolio(
        portfolioTransition?.destinationLocation || location,
        Boolean(portfolioTransition)
      )}

      <AnimatePresence>
        {portfolioTransition && (
          <PortfolioLayerTransition
            key={portfolioTransition.originLocation.key}
            onComplete={completePortfolioTransition}
          >
            {renderPortfolio(portfolioTransition.originLocation, true)}
          </PortfolioLayerTransition>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectDetailRoute() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state?.project;

  if (!project) {
    return (
      <MissingRouteState
        title="Project not found"
        message={`No project data was available for project ID "${projectId}". Open this project from the projects page.`}
        buttonLabel="Back to projects"
        onBack={() => navigate("/projects")}
      />
    );
  }

  return <ProjectDetailPage project={project} onBack={() => navigate("/projects")} />;
}

function BlogDetailRoute() {
  const { blogId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <MissingRouteState
        title="Blog post not found"
        message={`No blog data was available for blog ID "${blogId}". Open this post from the blog page.`}
        buttonLabel="Back to blog"
        onBack={() => navigate("/blog")}
      />
    );
  }

  return <BlogDetailPage blog={blog} onBack={() => navigate("/blog")} />;
}

function MissingRouteState({ title, message, buttonLabel, onBack }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">{title}</h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">{message}</p>
        <button type="button" onClick={onBack} className="mt-6 rounded-full bg-[#4075F7] px-5 py-2 text-sm font-medium text-white">
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
