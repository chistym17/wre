import Footer from "@/components/Footer";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/styles/globals.css";
import Router, { useRouter } from "next/router"; // Import next/router for event handling
import NProgress from "nprogress"; // Import nprogress
import { useEffect, useState } from "react";
// Import nprogress styles
import "nprogress/nprogress.css";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && router.pathname !== "/login") {
      router.push("/login"); // Redirect to login if not authenticated
    } else if (!loading && user && router.pathname === "/login") {
      router.push("/"); // Redirect to home if authenticated
    }
  }, [user, loading, router]);

  if (loading || router.pathname === "/login") {
    return children;
  }

  return user ? children : null;
}

// Configure nprogress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const [isContentBlurred, setContentBlurred] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    // Function to blur the content and show overlay
    const blurContent = () => {
      setContentBlurred(true);
      setOverlayVisible(true);
      alert("Screenshots are not allowed on this page.");
    };

    // Function to handle screenshot keys (PrintScreen and Cmd+Shift+4 on Mac)
    const disableScreenshotKeys = (event) => {
      if (
        event.key === "PrintScreen" ||
        (event.metaKey && event.shiftKey && event.key === "4")
      ) {
        event.preventDefault();
        blurContent(); // Trigger blur and overlay
      }
    };

    // Disable right-click
    const disableRightClick = (event) => {
      event.preventDefault();
      alert("Right-click is disabled!");
    };

    // Add event listeners
    document.addEventListener("keydown", disableScreenshotKeys);
    document.addEventListener("contextmenu", disableRightClick);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("keydown", disableScreenshotKeys);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  // Apply the blur effect to the content
  useEffect(() => {
    const mainContent = document.getElementById("main-content");
    if (isContentBlurred && mainContent) {
      mainContent.style.filter = "blur(10px)";
    } else if (mainContent) {
      mainContent.style.filter = "none";
    }
  }, [isContentBlurred]);

  return (
    <AuthProvider>
      <AuthGuard>
        {/* Anti-screenshot overlay */}
        {overlayVisible && <div className="anti-screenshot-overlay"></div>}

        {/* Main content wrapper */}
        <div id="main-content">
          <Component {...pageProps} />
        </div>

        <Footer />
      </AuthGuard>
    </AuthProvider>
  );
}
