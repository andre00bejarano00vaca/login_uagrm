"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const GQL_QUERY = `
query EstudiantePorRegistro($registro: String!) {
  estudiantePorRegistro(registro: $registro) {
    registro
    apellidosNombres
    ci
    email
    sexo
    estadoCivil
    fechaNacimiento
    pais
    departamento
    provincia
    nacionalidad
    direccion
    telefono
    celular
    modalidadIngreso
    periodo
    tipoSangre
    tituloBachiller
  }
}
`;

function fmtDate(iso) {
  if (!iso) return "—";
  const tryISO = new Date(iso);
  if (!Number.isNaN(tryISO.getTime())) {
    const dd = String(tryISO.getDate()).padStart(2, "0");
    const mm = String(tryISO.getMonth() + 1).padStart(2, "0");
    const yyyy = tryISO.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
  if (/^\d{2}[\/\-]\d{2}[\/\-]\d{4}$/.test(iso)) return iso.replaceAll("-", "/");
  return iso;
}

function CopyButton({ text, ariaLabel = "Copiar" }) {
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch {}
      }}
      className="inline-flex items-center rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-100 active:scale-[0.98]"
      title={ariaLabel}
      aria-label={ariaLabel}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M9 2a1 1 0 0 0-1 1v1H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V8.828a2 2 0 0 0-.586-1.414l-3.828-3.828A2 2 0 0 0 14.172 3H14V3a1 1 0 0 0-1-1H9Zm4 3h1.172L18 8.828V10h-3a2 2 0 0 1-2-2V5ZM8 4h4v1a1 1 0 0 0 1 1h1v2a4 4 0 0 0 4 4h2v5a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h2V3a1 1 0 0 1 1-1Z" />
      </svg>
    </button>
  );
}

function Field({ label, value, copy }) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] uppercase tracking-wide text-zinc-500 font-semibold">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-zinc-900 font-medium break-words">{value ?? "—"}</span>
        {copy ? <CopyButton text={value} ariaLabel={`Copiar ${label}`} /> : null}
      </div>
    </div>
  );
}

function SkeletonField() {
  return (
    <div className="space-y-1 animate-pulse">
      <div className="h-2 w-24 rounded bg-zinc-200" />
      <div className="h-4 w-40 rounded bg-zinc-200" />
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alumno, setAlumno] = useState(null);
  const [showPhoto, setShowPhoto] = useState(false);

  // Cerrar modal con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowPhoto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Cargar datos
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const registro = typeof window !== "undefined" ? localStorage.getItem("registro") : null;

    if (!GRAPHQL_URL) {
      setError("Falta NEXT_PUBLIC_GRAPHQL_ENDPOINT en .env.local");
      return;
    }
    if (!token || !registro) {
      router.replace("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(GRAPHQL_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: GQL_QUERY, variables: { registro } }),
          cache: "no-store",
        });
        const json = await res.json();
        if (!res.ok || json.errors) {
          throw new Error(json?.errors?.[0]?.message || `HTTP ${res.status}`);
        }
        setAlumno(json.data?.estudiantePorRegistro || null);
      } catch (e) {
        setError(e.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const initials = useMemo(() => {
    const name = alumno?.apellidosNombres || "";
    const parts = name.split(" ").filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("");
  }, [alumno]);

  return (
    <div className="min-h-screen bg-zinc-50 print-root">
      {/* header imprime (foto también saldrá en PDF) */}
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-zinc-900">Datos Personales</h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm print-card">
          {/* Encabezado con foto */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 border-b border-zinc-200 print-header">
            <div className="flex items-center gap-4">
              {/* Foto de perfil (clic para ampliar) — render más nítido (128x128) */}
              <button
                type="button"
                onClick={() => setShowPhoto(true)}
                className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-zinc-300 focus:outline-none focus:ring-zinc-400 transition"
                title="Ver foto"
              >
                <Image
                  src="/ImagenPerfilPrueba/perfilprueba.webp"
                  alt="Foto de perfil"
                  width={128}
                  height={128}
                  className="h-16 w-16 object-cover"
                  priority
                />
              </button>

              <div>
                <div className="text-lg md:text-xl font-semibold text-zinc-900 print-title">
                  {alumno?.apellidosNombres || (loading ? "Cargando…" : "—")}
                </div>
                <div className="text-sm text-zinc-500 print-subtitle">
                  Registro {alumno?.registro || "—"}
                </div>
              </div>
            </div>

            {/* Botón imprimir (oculto en PDF) */}
            <div className="flex flex-wrap gap-2 pr-1 no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 active:scale-[0.98]"
                title="Imprimir o guardar como PDF"
              >
                Imprimir
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 print-body">
            {error ? (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {/* Secciones con separador suave */}
            <div className="grid grid-cols-1 gap-8 print-gap">
              {/* Identificación */}
              <section className="print-keep border-t border-zinc-200/70 pt-6 first:border-t-0 first:pt-0">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 print-h2">Identificación</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print-grid">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonField key={i} />)
                  ) : (
                    <>
                      <Field label="Registro" value={alumno?.registro} copy />
                      <Field label="Apellidos y Nombres" value={alumno?.apellidosNombres} />
                      <Field label="Cédula de Identidad" value={alumno?.ci} copy />
                      <Field label="Email" value={alumno?.email} copy />
                      <Field label="Sexo" value={alumno?.sexo} />
                      <Field label="Estado Civil" value={alumno?.estadoCivil} />
                    </>
                  )}
                </div>
              </section>

              {/* Nacimiento & Ubicación */}
              <section className="print-keep border-t border-zinc-200/70 pt-6 first:border-t-0">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 print-h2">Nacimiento & Ubicación</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print-grid">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, i) => <SkeletonField key={i} />)
                  ) : (
                    <>
                      <Field label="Fecha de Nacimiento" value={fmtDate(alumno?.fechaNacimiento)} />
                      <Field label="País" value={alumno?.pais} />
                      <Field label="Departamento" value={alumno?.departamento} />
                      <Field label="Provincia" value={alumno?.provincia} />
                      <Field label="Nacionalidad" value={alumno?.nacionalidad} />
                      <Field label="Dirección" value={alumno?.direccion} />
                    </>
                  )}
                </div>
              </section>

              {/* Contacto */}
              <section className="print-keep border-t border-zinc-200/70 pt-6 first:border-t-0">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 print-h2">Contacto</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print-grid">
                  {loading ? (
                    Array.from({ length: 2 }).map((_, i) => <SkeletonField key={i} />)
                  ) : (
                    <>
                      <Field label="Teléfono" value={alumno?.telefono} copy />
                      <Field label="Celular" value={alumno?.celular} copy />
                    </>
                  )}
                </div>
              </section>

              {/* Académicos */}
              <section className="print-keep border-t border-zinc-200/70 pt-6 first:border-t-0">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 print-h2">Académicos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 print-grid">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <SkeletonField key={i} />)
                  ) : (
                    <>
                      <Field label="Modalidad de Ingreso" value={alumno?.modalidadIngreso} />
                      <Field label="Periodo" value={alumno?.periodo} />
                      <Field label="Tipo de Sangre" value={alumno?.tipoSangre} />
                      <Field label="Título de Bachiller" value={alumno?.tituloBachiller} />
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 no-print">Perfil — Universidad · Tailwind CSS</p>
      </main>

      {/* Overlay con foto grande (no se imprime) */}
      {showPhoto && (
        <div
          className="fixed inset-0 z-50 no-print bg-black/70 p-4 flex items-center justify-center"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="relative max-w-[92vw] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/ImagenPerfilPrueba/perfilprueba.webp"
              alt="Foto de perfil grande"
              width={1200}
              height={1200}
              className="max-h-[92vh] w-auto object-contain rounded-xl shadow-xl"
              priority
            />

            <button
              type="button"
              onClick={() => setShowPhoto(false)}
              className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white text-zinc-700 shadow hover:bg-zinc-100"
              aria-label="Cerrar"
              title="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Estilos globales */}
      <style jsx global>{`
        /* Suaviza el borde de cada sección también en pantalla */
        section { scroll-margin-top: 80px; }

        @media print {
          /* Tamaño y márgenes de página */
          @page { size: A4 portrait; margin: 12mm; }

          /* Ajustes generales */
          html, body { height: auto !important; overflow: visible !important; }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-size: 11px; /* base más compacta */
            line-height: 1.2;
          }

          /* Alineación del encabezado al imprimir */
          .print-header { display: flex; align-items: center; }

          /* Ocultar lo que no debe imprimirse */
          .no-print { display: none !important; }

          /* Fondos blancos y sin sombras/bordes fuertes en papel */
          .bg-zinc-50, .bg-white { background: #fff !important; }
          .shadow-sm, .border { box-shadow: none !important; }

          /* Separadores: un poco más visibles en papel */
          .border-zinc-200\\/70 { border-color: #d4d4d8 !important; }

          /* Compactar card y secciones */
          .print-card { padding: 16px !important; }
          .print-title { font-size: 16px !important; }
          .print-subtitle { font-size: 11px !important; }
          .print-body { padding: 16px !important; }
          .print-gap { gap: 14px !important; }
          .print-grid { gap: 10px !important; }
          .print-h2 {
            margin-bottom: 6px !important;
            font-size: 11px !important;
            letter-spacing: .04em !important;
          }

          /* Evitar saltos feos */
          .print-keep { break-inside: avoid; page-break-inside: avoid; }

          /* Ajuste global para intentar 1 hoja */
          .print-root { zoom: 0.92; }
        }
      `}</style>
    </div>
  );
}
