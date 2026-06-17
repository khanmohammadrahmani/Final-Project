import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserService from "../../services/user.service";

import loginBg from "../../assets/images/login-bg.webp";
import { FaEye, FaEyeSlash, FaUserLock } from "react-icons/fa";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ===== FORM (FIXED FOR BACKEND LOGIN) =====
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ===== UI STATES =====
  const [showPassword, setShowPassword] = useState(false);
  const [blockTime, setBlockTime] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  const [showForgot, setShowForgot] = useState(false);
  const [showSignupInfo, setShowSignupInfo] = useState(false);

  const [serviceMsg, setServiceMsg] = useState("");

  // ===== INPUT HANDLER =====
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===== LOGIN =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (blockTime > 0) return;

    try {
      const res = await UserService.login(form);
      const user = res.data.user;

      if (!user) return;

      setFailedAttempts(user.failed_attempts || 0);

      localStorage.setItem("user", JSON.stringify(user));

      setToastType("success");
      setToast(t("login_success"));

      switch (user.user_role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Employee":
          navigate("/employee/dashboard");
          break;
        case "Customer":
          navigate("/customer/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      const attempts =
        (err.response?.data?.failed_attempts || failedAttempts) + 1;

      setFailedAttempts(attempts);

      if (attempts === 3) setBlockTime(30);
      else if (attempts === 5) setBlockTime(60);
      else if (attempts >= 6) {
        setToastType("error");
        setToast(t("user_inactive"));
        return;
      }

      setToastType("error");
      setToast(err.response?.data?.message || "Login failed");
    }
  };

  // ===== BLOCK TIMER =====
  useEffect(() => {
    if (blockTime <= 0) {
      setToast("");
      return;
    }

    const timer = setInterval(() => {
      setBlockTime((p) => p - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [blockTime]);

  const progress =
    blockTime > 0 ? (blockTime / (failedAttempts >= 5 ? 60 : 30)) * 100 : 0;

  const progressColor =
    blockTime <= 8
      ? "bg-green-400"
      : blockTime <= 20
        ? "bg-yellow-400"
        : "bg-red-500";

  // ===== UI CLICK HANDLERS (NO SERVICE YET) =====
  const handleForgotPassword = () => {
    setServiceMsg("Forgot password service is not available yet.");
    setTimeout(() => setServiceMsg(""), 3000);
  };
  const handleSignup = () => {
    setServiceMsg("Signup service is not available yet.");
    setTimeout(() => setServiceMsg(""), 3000);
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center p-4 bg-cover bg-center relative font-sans antialiased selection:bg-blue-500 selection:text-white animate-bgGradient"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "108% 100%",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 via-cyan-100/10 to-black/10 w-dvw min-h-screen"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* FORM CARD */}
        <div className="bg-white/85 backdrop border border-white/60 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:border-blue-400/40 ring-1 ring-black/5">
          {/* HEADER */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 animate-pulse">
              <FaUserLock className="-rotate-45 text-2xl text-white" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-center bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 bg-clip-text text-transparent tracking-wide">
              {t("welcome_login")}
            </h2>

            <p className="text-[10px] text-blue-600/70 mt-1 tracking-wider uppercase font-bold">
              Water Management System
            </p>
          </div>

          {/* BLOCK BAR */}
          {blockTime > 0 && (
            <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`${progressColor} h-full rounded-full transition-all duration-1000`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* TOAST */}
          {toast && (
            <div
              className={`p-3 rounded-xl text-center mb-4 text-sm border font-semibold ${
                toastType === "error"
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}
            >
              {toast}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={blockTime > 0}
                placeholder=" "
                className="peer w-full h-13 px-4 pt-5 pb-1 border border-slate-300/80 rounded-xl bg-white/60 text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50"
              />

              <label className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-2.5 peer-[&:not(:placeholder-shown)]:text-xs">
                {t("email")}
              </label>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <FaUserLock className="text-sm" />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={blockTime > 0}
                placeholder=" "
                className="peer w-full h-13 px-4 pt-5 pb-1 border border-slate-300/80 rounded-xl bg-white/60 text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50"
              />
              <label className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-blue-600 peer-[&:not(:placeholder-shown)]:top-2.5 peer-[&:not(:placeholder-shown)]:text-xs">
                {t("password")}
              </label>

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={blockTime > 0}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3.5 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              {t("login")}
            </button>
          </form>

          {/* LINKS */}
          <div className="mt-6 text-center space-y-3 text-xs text-slate-600 border-t pt-4">
            <div className="flex justify-between font-bold">
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() =>
                  setToast("Forgot password service is not available yet")
                }
              >
                {t("forgot_password")}
              </p>

              <p
                className="text-slate-500 cursor-pointer"
                onClick={() => setToast("Signup service is not available yet")}
              >
                {t("signup")}
              </p>
            </div>

            <p className="text-[10px] text-slate-400">
              © {new Date().getFullYear()} Nexora-Code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
