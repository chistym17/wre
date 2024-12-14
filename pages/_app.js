import Footer from "@/components/Footer";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import "@/styles/globals.css";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import "nprogress/nprogress.css";

function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user && router.pathname !== "/login") {
        router.push("/login");
      } else if (user) {
        if (router.pathname === "/login") {
          router.push(user.role === 'admin' ? '/admin' : '/');
        } else if (router.pathname === "/admin" && user.role !== 'admin') {
          router.push('/');
        }
      }
    }
  }, [user, loading, router]);

  if (loading || router.pathname === "/login") {
    return children;
  }

  // Only render protected routes if authenticated
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
    const blurContent = () => {
      setContentBlurred(true);
      setOverlayVisible(true);
      alert("Screenshots are not allowed on this page.");
    };

    const disableScreenshotKeys = (event) => {
      if (
        event.key === "PrintScreen" ||
        (event.metaKey && event.shiftKey && event.key === "4")
      ) {
        event.preventDefault();
        blurContent();
      }
    };

    const disableRightClick = (event) => {
      event.preventDefault();
      alert("Right-click is disabled!");
    };

    document.addEventListener("keydown", disableScreenshotKeys);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", disableScreenshotKeys);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

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
        {overlayVisible && <div className="anti-screenshot-overlay"></div>}
        <div id="main-content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthGuard>
    </AuthProvider>
  );
}
