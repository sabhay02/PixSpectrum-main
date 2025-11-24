import React, { useEffect, useState } from "react";
import { ImageIcon, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/AsyncThunk";
import { useToast } from "@/hooks/use-toast";
import { getId, setUserInfo } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const userId = useSelector(getId);

  useEffect(() => {
    if (userId) {
      navigate("/filter");
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);
    dispatch(login({ email, password }))
      .unwrap()
      .then((data) => {
        console.log(data);
        dispatch(setUserInfo(data.user));
        navigate("/filter");
        toast({ title: "Login successful", type: "success" });
      })
      .catch((err) => {
        console.log(err);
        toast({ title: err, type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-login-gradient px-4 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="auth-card max-w-md w-full space-y-8 p-10 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 relative z-10">
        <div className="text-center">
          <div className="flex justify-center">
            <div
              className="auth-icon p-3 rounded-full shadow-lg"
              style={{ backgroundColor: "#9959F5" }}
            >
              <ImageIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2
            className="auth-title mt-6 text-4xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #9959F5, #7c3aed)",
            }}
          >
            PixSpectrum
          </h2>
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Sign in to your account
          </p>
        </div>

        <form className="auth-form mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 sm:text-sm"
                style={{ "--tw-ring-color": "#9959F5" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#9959F5";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(153, 89, 245, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 sm:text-sm"
                style={{ "--tw-ring-color": "#9959F5" }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#9959F5";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(153, 89, 245, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="auth-button group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-colors"
              style={{ backgroundColor: "#9959F5" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#7c3aed")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#9959F5")}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <span className="relative z-10">Sign in</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="auth-link font-semibold transition-colors"
              style={{ color: "#9959F5" }}
              onMouseEnter={(e) => (e.target.style.color = "#7c3aed")}
              onMouseLeave={(e) => (e.target.style.color = "#9959F5")}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
