"use client";

import { Flame } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mx-auto mb-6">
          <Flame className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Algo salió mal
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
