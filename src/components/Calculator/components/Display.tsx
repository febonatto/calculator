import { useState } from 'react';
import { DeleteIcon, ClockIcon, EraserIcon } from 'lucide-react';
import { Popover } from '../../Popover';
import { localStorageKeys } from '../../../config/localStorageKeys';

interface DisplayProps {
  value: string;
  expression?: string;
  onBackspace(): void;
  onHistoryExpression(row: string): void;
  onHistoryResult(row: string): void;
}
export function Display({
  value,
  expression,
  onBackspace,
  onHistoryExpression,
  onHistoryResult,
}: DisplayProps) {
  const [resultsHistory, setResultsHistory] = useState<string[]>([]);

  function getResultsHistory() {
    setResultsHistory(
      JSON.parse(
        localStorage.getItem(localStorageKeys.RESULTS_HISTORY) || '[]',
      ),
    );
  }

  function cleanHistory() {
    setResultsHistory([]);
    localStorage.setItem(localStorageKeys.RESULTS_HISTORY, '[]');
  }

  return (
    <div className="flex h-24 flex-col items-end gap-4">
      <div className="relative w-full flex-1 bg-transparent px-2 text-end ">
        <span className="absolute right-2 top-0 text-sm text-zinc-400">
          {expression}
        </span>
        <span className="absolute bottom-0 right-2 text-3xl font-bold text-zinc-50">
          {value}
        </span>
      </div>
      <div className="flex w-full items-center justify-between px-2">
        <Popover.Root>
          <Popover.Trigger>
            <button onClick={getResultsHistory}>
              <ClockIcon size={22} className="text-zinc-50" />
            </button>
          </Popover.Trigger>
          {resultsHistory.length > 0 && (
            <Popover.Content>
              <div className="flex max-h-[333px] flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-zinc-950 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-track]:bg-zinc-600 [&::-webkit-scrollbar]:w-1">
                {resultsHistory.map((result) => {
                  const [expression, expressionResult] = result.split('=');

                  return (
                    <div key={Math.random()} className="flex flex-col">
                      <button
                        className="w-fit hover:font-bold"
                        onClick={() => onHistoryExpression(result)}
                      >
                        {expression}
                      </button>
                      <button
                        className="w-fit text-blue-500 hover:font-bold"
                        onClick={() => onHistoryResult(result)}
                      >
                        = {expressionResult}
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-4 flex w-full justify-end"
                onClick={cleanHistory}
              >
                <EraserIcon size={20} className="text-red-700" />
              </button>
            </Popover.Content>
          )}
        </Popover.Root>
        <button onClick={onBackspace}>
          <DeleteIcon size={24} className="text-green-500" />
        </button>
      </div>
    </div>
  );
}
