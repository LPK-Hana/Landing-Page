"use client";

import { FormEvent } from "react";

const HANA_APP_URL = (process.env.NEXT_PUBLIC_HANA_APP_URL || "http://localhost:3000").replace(
  /\/$/,
  "",
);

const LOGO_SRC = "/wp-content/uploads/2024/12/logo-minori.webp";

type AuthCardProps = {
  mode: "login" | "register";
  error?: string;
  info?: string;
  sent?: boolean;
  email?: string;
};

export function AuthCard({ mode, error, info, sent, email }: AuthCardProps) {
  const isLogin = mode === "login";
  const action = isLogin
    ? `${HANA_APP_URL}/auth/student-login`
    : `${HANA_APP_URL}/auth/student-register`;

  const onForgot = (e: FormEvent) => {
    e.preventDefault();
    window.alert("Untuk reset password, hubungi admin Raftel.");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          {sent ? "Aktivasi Email" : isLogin ? "Login" : "Daftar"}
        </div>
        <div className="auth-card-body">
          <img src={LOGO_SRC} alt="Logo" className="auth-logo" />

          {error ? <p className="auth-error">{error}</p> : null}
          {info ? <p className="auth-info">{info}</p> : null}

          {sent ? (
            <>
              <p className="auth-switch">
                Kami sudah mengirim tautan aktivasi
                {email ? (
                  <>
                    {" "}
                    ke <strong>{email}</strong>
                  </>
                ) : null}
                . Buka email, lalu klik tautannya sebelum login.
              </p>
              <form
                action={`${HANA_APP_URL}/auth/resend-activation`}
                method="post"
                className="auth-form"
              >
                <input type="hidden" name="user_name" value={email || ""} />
                <button type="submit" className="auth-submit">
                  KIRIM ULANG EMAIL
                </button>
              </form>
              <p className="auth-switch">
                Sudah aktivasi? <a href="/login">Login</a>
              </p>
            </>
          ) : (
            <form action={action} method="post" className="auth-form">
              {!isLogin ? (
                <input
                  name="name"
                  type="text"
                  placeholder="Nama lengkap"
                  autoComplete="name"
                  required
                />
              ) : null}
              <input
                name="user_name"
                type={isLogin ? "text" : "email"}
                placeholder={isLogin ? "Email / Username" : "Email"}
                autoComplete="username"
                required
              />
              <input
                name="user_password"
                type="password"
                placeholder="Password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                minLength={isLogin ? 1 : 6}
              />
              {!isLogin ? (
                <input
                  name="user_password_confirm"
                  type="password"
                  placeholder="Konfirmasi password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              ) : null}

              {isLogin ? (
                <label className="auth-remember">
                  <input name="remember_me" type="checkbox" />
                  Remember Me
                </label>
              ) : null}

              <button type="submit" className="auth-submit">
                {isLogin ? "LOGIN" : "DAFTAR"}
              </button>
            </form>
          )}

          {!sent && isLogin ? (
            <p className="auth-switch">
              Belum punya akun? <a href="/register">Daftar</a>
            </p>
          ) : null}
          {!sent && !isLogin ? (
            <p className="auth-switch">
              Sudah punya akun? <a href="/login">Login</a>
            </p>
          ) : null}

          {isLogin && !sent ? (
            <p className="auth-forgot">
              <a href="#forgot" onClick={onForgot}>
                FORGOT YOUR PASSWORD?
              </a>
            </p>
          ) : null}

          <p className="auth-back">
            <a href="/">Kembali ke beranda</a>
          </p>
        </div>
      </div>
    </main>
  );
}
