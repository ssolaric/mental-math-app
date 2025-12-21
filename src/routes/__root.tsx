import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { TranslationProvider } from '../i18n/TranslationContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

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
