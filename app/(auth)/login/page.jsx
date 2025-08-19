"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { gql } from "graphql-request";
import { makeClient } from "@/lib/graphqlClient"; // usa el que ya creaste

// Mutation de login (como la probaste en Postman)
const LOGIN = gql`
  mutation Login($registro: String!, $password: String!) {
    login(registro: $registro, password: $password) {
      token
      user { id username email }
    }
  }
`;

export default function Login() {
  const [form, setForm] = useState({ user: "", pass: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      // el login NO lleva token
      const client = makeClient();
      const { login } = await client.request(LOGIN, {
        registro: form.user.trim(),
        password: form.pass.trim(),
      });

      const token = login?.token;
      if (!token) throw new Error("Credenciales incorrectas");

      // guarda sesión para siguientes requests protegidos
      localStorage.setItem("authToken", token);
      localStorage.setItem("registro", form.user.trim());
      // si te sirve el usuario:
      localStorage.setItem("usuario", JSON.stringify(login.user || null));

      // redirige a tu ruta actual
      router.push("/dashboard");
    } catch (e2) {
      const msg =
        e2?.response?.errors?.[0]?.message ||
        e2?.message ||
        "No se pudo iniciar sesión";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="relative hidden lg:flex items-center justify-center bg-gray-100 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />
        <div className="relative z-10 max-w-xl w-full px-12">
          <div className="flex items-center gap-5">
            <Image
              src="/login/uagrm-escudo.webp"
              alt="Escudo UAGRM"
              width={160}
              height={160}
              priority
              className="w-28 h-auto"
            />
            <div className="leading-tight">
              <h2 className="text-5xl font-extrabold tracking-tight">
                <span className="text-blue-900">U</span>
                <span className="text-red-600">A</span>
                <span className="text-blue-900">G</span>
                <span className="text-red-600">RM</span>
              </h2>
              <p className="mt-1 text-sm uppercase tracking-wide text-gray-600">
                Universidad Autónoma “Gabriel René Moreno”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center p-5 sm:p-6 lg:p-10 min-h-screen">
        <Image
          src="/login/uagrmfondo.webp"
          alt="Fondo UAGRM"
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover object-center blur-[1.5px] brightness-100 contrast-105 saturate-110"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="relative z-10 w-full max-w-sm sm:max-w-md">
          <div className="rounded-2xl bg-white/95 backdrop-blur shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center gap-3 px-5 pt-5 lg:hidden">
              <div className="mx-auto w-16 sm:w-20 md:w-24">
                <Image
                  src="/login/uagrm-escudo.webp"
                  alt="Escudo UAGRM"
                  width={500}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div className="px-5 pt-3 text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Iniciar sesión
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Ingresa tus credenciales institucionales
              </p>
            </div>

            <form onSubmit={onSubmit} className="px-5 pt-5 pb-6 space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label htmlFor="user" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Registro
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    id="user"
                    name="user"
                    type="text"
                    autoComplete="username"
                    placeholder="Ej. 218110001"
                    value={form.user}
                    onChange={onChange}
                    className="w-full h-11 sm:h-12 rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-3 text-[14px] sm:text-[15px] outline-none ring-blue-900/20 transition focus:border-blue-900 focus:ring-4"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="pass" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    id="pass"
                    name="pass"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.pass}
                    onChange={onChange}
                    className="w-full h-11 sm:h-12 rounded-lg border border-gray-300 bg-white pl-9 sm:pl-10 pr-10 text-[14px] sm:text-[15px] outline-none ring-blue-900/20 transition focus:border-blue-900 focus:ring-4"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <Link href="#" className="text-blue-900 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
                <Link href="#" className="text-gray-500 hover:text-gray-700">
                  Necesito ayuda
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 sm:h-12 rounded-lg bg-red-600 text-white font-semibold shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/30 disabled:opacity-70"
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>

              {err && <p className="text-center text-xs text-red-600">{err}</p>}

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-[11px] sm:text-xs text-gray-400">Acceso directo a:</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="flex flex-col space-y-2 text-center">
                <Link href="https://inscripcion.uagrm.edu.bo/" target="_blank" className="text-blue-600 hover:underline text-sm">
                  Inscripción Web
                </Link>
                <Link href="https://www.uagrm.edu.bo/udigital/titulos" target="_blank" className="text-blue-600 hover:underline text-sm">
                  Formulario de seguimiento a Titulados
                </Link>
              </div>

              <p className="text-center text-[11px] sm:text-xs text-gray-500 mt-2">
                © {new Date().getFullYear()} UAGRM · Todos los derechos reservados
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
