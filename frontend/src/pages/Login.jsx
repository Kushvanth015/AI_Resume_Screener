import React, { useState } from "react";

import API from "../services/api";

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    setLoading(true);

    try {

      const response = await fetch(
        "https://ai-resume-screener-uhow.onrender.com",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        window.location.href = "/dashboard";

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">

      <div className="bg-zinc-900 p-10 rounded-3xl w-[450px]">

        <h1 className="text-4xl font-bold mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-4 rounded-xl bg-zinc-800"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-zinc-800"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 py-4 rounded-2xl text-xl font-bold flex justify-center items-center gap-3"
        >

          {
            loading ? (

              <>

                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                Logging In...

              </>

            ) : (

              "Login"
            )
          }

        </button>
      </div>
    </div>
  );
};

export default Login;