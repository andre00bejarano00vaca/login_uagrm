"use client";
import Image from "next/image";

export default function HeaderUAGRM() {
  return (
    <header className="relative text-white">
      {/* Banda superior azul */}
      <div className="bg-[#0B3B71]">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          {/* Marca izquierda */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
              {/* Logo oficial UAGRM (coloca tu imagen en /public/uagrm/logo.png) */}
              {/* <Image src="/uagrm/logo.png" alt="UAGRM" width={36} height={36} className="object-contain" /> */}
              <span className="text-lg font-semibold">U</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm md:text-base font-semibold tracking-wide">
                Universidad Autónoma Gabriel René Moreno
              </div>
              <div className="text-[11px] md:text-xs text-white/80">
                Sistema de Información — Consultas Estudiantes
              </div>
            </div>
          </div>

          {/* Franja decorativa derecha */}
          <div className="hidden md:flex items-center gap-2">
            <div className="h-9 w-14 rounded overflow-hidden ring-1 ring-white/20 bg-white/10">
              <Image src="/ImagenPerfilPrueba/perfilprueba.webp" alt="" width={56} height={36} className="h-full w-full object-cover" />
            </div>
            <div className="h-9 w-14 rounded overflow-hidden ring-1 ring-white/20 bg-white/10">
              <Image src="/ImagenPerfilPrueba/perfilprueba.webp" alt="" width={56} height={36} className="h-full w-full object-cover" />
            </div>
            <div className="h-9 w-14 rounded overflow-hidden ring-1 ring-white/20 bg-white/10">
              <Image src="/ImagenPerfilPrueba/perfilprueba.webp" alt="" width={56} height={36} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
