# BITEBOX 🍔🔥

**Comida Rápida Gourmet** — Aplicación web de menú interactivo con panel de administración para restaurante de hamburguesas premium.

## Tecnologías

- [Next.js 16](https://nextjs.org) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (animaciones)
- Lucide React (iconos)
- JWT con `jose` para autenticación admin
- Vitest + Testing Library (pruebas)

## Scripts

```bash
npm run dev        # Inicia servidor de desarrollo
npm run build      # Construye para producción
npm run start      # Inicia servidor de producción
npm run lint       # Ejecuta ESLint
npm run format     # Formatea código con Prettier
npm test           # Ejecuta tests con Vitest
npm run typecheck  # Verifica tipos con TypeScript
```

## Estructura

```
app/                # App Router (páginas, layouts, server actions)
├── admin/          # Panel de administración protegido
├── actions/        # Server actions (auth, menú)
├── lib/            # Utilidades y helpers
├── __tests__/      # Pruebas unitarias
components/         # Componentes reutilizables (UI, menú, modales)
context/            # Contextos de React (menú, toasts)
data/               # Tipos y datos de semilla
public/             # Archivos estáticos e imágenes
middleware.ts       # Middleware de autenticación (JWT)
```
