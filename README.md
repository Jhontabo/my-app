# BITEBOX 🍔🔥

**Comida Rápida Gourmet** — Aplicación web de menú interactivo con panel de administración.

## Tecnologías

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React (iconos)
- react-hook-form + Zod (validación)
- JWT (jose) para autenticación admin

## Scripts

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
npm run format   # Formatea código con Prettier
npm test         # Ejecuta tests con Vitest
npm run typecheck # Verifica tipos con TypeScript
```

## Estructura

```
app/              # App Router (páginas, layouts, server actions)
  admin/          # Panel de administración
  actions/        # Server actions (auth)
  lib/            # Utilidades (session JWT)
components/       # Componentes reutilizables
context/          # Contextos de React (menú)
data/             # Datos de semilla y tipos
public/           # Archivos estáticos
proxy.ts          # Middleware de autenticación
```
