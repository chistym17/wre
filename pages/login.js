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

  // While loading or if on the login page, show children (the login page itself)
  if (loading || router.pathname === "/login") {
    return children;
  }

  // Show content if authenticated
  return user ? children : null;
}

// Configure nprogress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }) {
  const [isContentBlurred, setContentBlurred] = useState(false);

  useEffect(() => {
    const blurContent = () => {
      setContentBlurred(true);
      alert("Screenshots are not allowed on this page.");
    };

    const removeBlur = () => {
      setContentBlurred(false);
    };

    const disableScreenshotKeys = (event) => {
      // Block PrintScreen key and Cmd+Shift+4 on Mac
      if (
        event.key === "PrintScreen" ||
        (event.metaKey && event.shiftKey && event.key === "4")
      ) {
        event.preventDefault();
        blurContent();
      }
    };

    // Prevent right-click
    const disableRightClick = (event) => {
      event.preventDefault();
      alert("Right-click is disabled!");
    };

    // Add event listeners
    document.addEventListener("keydown", disableScreenshotKeys);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", disableScreenshotKeys);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  // Apply blur to main content when necessary
  useEffect(() => {
    if (isContentBlurred) {
      // Apply blur effect to the main content div
      document.getElementById("main-content").style.filter = "blur(10px)";
    } else {
      document.getElementById("main-content").style.filter = "none";
    }
  }, [isContentBlurred]);

  return (
    <AuthProvider>
      <AuthGuard>
        {/* Overlay for anti-screenshot (optional) */}
        <div className="anti-screenshot-overlay"></div>

        {/* Apply an id to the main content wrapper to target it for blur */}
        <div id="main-content">
          <Component {...pageProps} />
        </div>

        <Footer />
      </AuthGuard>
    </AuthProvider>
  );
}
