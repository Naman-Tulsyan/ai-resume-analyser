import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resumind | Authentication" },
    {
      name: "description",
      content: "Log in to your account or create a new one!",
    },
  ];
}

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  const location = useLocation();
  console.log(location);
  const next = location.search.split("next=")[1];
  console.log(next);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex justify-center items-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-4 bg-white p-10 rounded-2xl">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1>Welcome</h1>
            <h2>Login to continue your journey!</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-plus">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button onClick={auth.signOut} className="auth-button">
                    <p>Sign Out</p>
                  </button>
                ) : (
                  <button onClick={auth.signIn} className="auth-button">
                    <p>Sign In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
