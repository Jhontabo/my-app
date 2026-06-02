"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Flame } from "lucide-react";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200/50 dark:border-neutral-800 shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
              BITE<span className="text-orange-500">BOX</span>
            </h1>
            <p className="text-sm text-neutral-400 font-medium mt-1">
              Panel de Administración
            </p>
          </div>

          <form action={action} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="admin@bitebox.com"
                className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:border-orange-500 dark:text-white transition-colors min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-h-[44px]"
            >
              {pending ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
