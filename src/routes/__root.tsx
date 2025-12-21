import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { TranslationProvider } from "../i18n/TranslationContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TranslationProvider>
      <LanguageSwitcher />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </TranslationProvider>
  );
}
