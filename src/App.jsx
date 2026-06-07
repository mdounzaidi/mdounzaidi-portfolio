import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/DashboardLayout";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ArticleFormPage from "./pages/ArticleFormPage";
import ArticlesPage from "./pages/ArticlesPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CompleteInvitePage from "./pages/CompleteInvitePage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import InvitesPage from "./pages/InvitesPage";
import ManageArticlesPage from "./pages/ManageArticlesPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        smoothTouch: true,
        touchMultiplier: 1,
      },
    });

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/complete-invite" element={<CompleteInvitePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="password" element={<ChangePasswordPage />} />

            <Route
              element={
                <RoleRoute roles={["ROLE_WRITER", "ROLE_ADMIN", "ROLE_SUPERADMIN"]} />
              }
            >
              <Route path="articles" element={<ManageArticlesPage />} />
              <Route path="articles/new" element={<ArticleFormPage />} />
              <Route path="articles/:slug/edit" element={<ArticleFormPage />} />
            </Route>

            <Route element={<RoleRoute roles={["ROLE_ADMIN", "ROLE_SUPERADMIN"]} />}>
              <Route path="invites" element={<InvitesPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
