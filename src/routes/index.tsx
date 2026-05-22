import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full flex flex-col items-start gap-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-graphite-light">
            Práctica diaria
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-graphite leading-[1.05]">
            Matemáticas
            <br />
            <span className="text-accent-dim">mentales</span>.
          </h1>
          <p className="text-lg text-graphite-mid max-w-md leading-relaxed">
            Diez problemas por ronda. Rápido, claro, sin distracciones.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <Link
            to="/operation-select"
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-graphite font-bold text-lg tracking-wide rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Comenzar
          </Link>
          <Link
            to="/stats"
            className="text-graphite-mid hover:text-graphite underline underline-offset-4 decoration-paper-border hover:decoration-graphite font-medium"
          >
            Ver progreso
          </Link>
        </div>
      </div>
    </div>
  );
}
