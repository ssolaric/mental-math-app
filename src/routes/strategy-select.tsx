import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { StrategySelector } from "../components/StrategySelector";
import { type Strategy, strategiesForOperation } from "../strategies";
import type { Operation } from "../types";

type StrategySearch = {
  operation: Operation;
};

export const Route = createFileRoute("/strategy-select")({
  validateSearch: (search: Record<string, unknown>): StrategySearch => ({
    operation: search.operation as Operation,
  }),
  component: StrategySelectPage,
});

function StrategySelectPage() {
  const navigate = useNavigate();
  const { operation } = Route.useSearch();

  const handleStandard = () => {
    navigate({ to: "/difficulty-select", search: { operation } });
  };

  const handleStrategy = (strategy: Strategy) => {
    navigate({
      to: "/difficulty-select",
      search: { operation, strategy: strategy.id },
    });
  };

  return (
    <StrategySelector
      operation={operation}
      strategies={strategiesForOperation(operation)}
      onSelectStandard={handleStandard}
      onSelectStrategy={handleStrategy}
    />
  );
}
