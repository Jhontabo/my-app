import Link from "next/link";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mx-auto mb-6">
          <Flame className="w-8 h-8" />
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight mb-2">
          404
        </h1>
        <p className="text-xl font-bold text-neutral-300 mb-2">
          Página no encontrada
        </p>
        <p className="text-sm text-neutral-500 mb-8">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
