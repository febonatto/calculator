import {
  PercentIcon,
  DivideIcon,
  XIcon,
  MinusIcon,
  PlusIcon,
  EqualIcon,
} from 'lucide-react';

import { Separator } from '../Separator';
import { Button } from './components/Button';
import { Display } from './components/Display';
import { useCalculatorController } from './useCalculatorController';

export function Calculator() {
  const {
    displayData,
    handleButtonClick,
    handleBackspaceClick,
    handleHistoryExpressionClick,
    handleHistoryResultClick,
  } = useCalculatorController();

  return (
    <div className="w-10/12 min-w-[280px] max-w-md">
      <Display
        value={displayData.value}
        expression={displayData.expression}
        onBackspace={handleBackspaceClick}
        onHistoryExpression={handleHistoryExpressionClick}
        onHistoryResult={handleHistoryResultClick}
      />
      <Separator />
      <div className="grid grid-cols-4 gap-2">
        <Button variant="clean" onClick={() => handleButtonClick('C')}>
          C
        </Button>
        <Button variant="expression" onClick={() => handleButtonClick('%')}>
          <PercentIcon size={16} />
        </Button>
        <Button variant="expression" onClick={() => handleButtonClick('/')}>
          <DivideIcon size={20} />
        </Button>
        <Button variant="expression" onClick={() => handleButtonClick('x')}>
          <XIcon size={20} />
        </Button>
        <Button onClick={() => handleButtonClick('7')}>7</Button>
        <Button onClick={() => handleButtonClick('8')}>8</Button>
        <Button onClick={() => handleButtonClick('9')}>9</Button>
        <Button variant="expression" onClick={() => handleButtonClick('-')}>
          <MinusIcon size={20} />
        </Button>
        <Button onClick={() => handleButtonClick('4')}>4</Button>
        <Button onClick={() => handleButtonClick('5')}>5</Button>
        <Button onClick={() => handleButtonClick('6')}>6</Button>
        <Button variant="expression" onClick={() => handleButtonClick('+')}>
          <PlusIcon size={20} />
        </Button>
        <Button onClick={() => handleButtonClick('1')}>1</Button>
        <Button onClick={() => handleButtonClick('2')}>2</Button>
        <Button onClick={() => handleButtonClick('3')}>3</Button>
        <Button
          variant="resolve"
          className="row-span-2"
          onClick={() => handleButtonClick('=')}
        >
          <EqualIcon size={20} />
        </Button>
        <Button className="col-span-2" onClick={() => handleButtonClick('0')}>
          0
        </Button>
        <Button onClick={() => handleButtonClick(',')}>,</Button>
      </div>
    </div>
  );
}
