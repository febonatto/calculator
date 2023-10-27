import { useState } from 'react';
import { localStorageKeys } from '../../config/localStorageKeys';

interface DisplayDataProps {
  value: string;
  expression: string;
}
export function useCalculatorController() {
  const VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const EXPRESSIONS = ['%', '/', 'x', '-', '+'];

  const [displayData, setDisplayData] = useState<DisplayDataProps>({
    value: '0',
    expression: '',
  });

  function handleButtonClick(value: string) {
    const { expression } = displayData;
    const hasExpression = !!expression;

    if (value === 'C') {
      setDisplayData({ value: '0', expression: '' });
    }

    if (value === '=' && hasExpression) {
      setDisplayData({
        value: resolve(),
        expression: '',
      });
    }

    if (value === ',') {
      setDisplayData((prevState) => {
        return {
          ...prevState,
          value: prevState.value.includes(',')
            ? prevState.value
            : prevState.value.concat(value),
        };
      });
    }

    if (VALUES.includes(value)) {
      setDisplayData((prevState) => {
        return {
          ...prevState,
          value:
            prevState.value === '0' ? value : prevState.value.concat(value),
        };
      });
    }

    if (EXPRESSIONS.includes(value)) {
      if (!hasExpression && displayData.value !== '0') {
        setDisplayData((prevState) => {
          return {
            value: '0',
            expression: `${prevState.value} ${value}`,
          };
        });
      }
      if (hasExpression && displayData.value !== '0') {
        setDisplayData({
          value: '0',
          expression: `${resolve()} ${value}`,
        });
      }
    }
  }

  function handleBackspaceClick() {
    setDisplayData((prevState) => {
      const { value } = prevState;

      return {
        ...prevState,
        value: value.length > 1 ? value.slice(0, value.length - 1) : '0',
      };
    });
  }

  function handleHistoryExpressionClick(row: string) {
    const fullExpression = row.split('=')[0];
    const [leftValue, expression, rightValue] = fullExpression.split(' ');
    setDisplayData({
      value: rightValue,
      expression: `${leftValue} ${expression}`,
    });
  }

  function handleHistoryResultClick(row: string) {
    const result = row.split('=')[1].trim();
    setDisplayData({
      value: result,
      expression: '',
    });
  }

  function resolve(): string {
    const { value, expression } = displayData;
    const [previousValue, previousExpression] = expression.split(' ');
    const formattedPreviousValue = Number(previousValue.replace(',', '.'));
    const formattedCurrentValue = Number(value.replace(',', '.'));

    let total = 0;
    if (previousExpression === '%') {
      total =
        (Number(formattedPreviousValue) / 100) * Number(formattedCurrentValue);
    } else if (previousExpression === '/') {
      total = Number(formattedPreviousValue) / Number(formattedCurrentValue);
    } else if (previousExpression === 'x') {
      total = Number(formattedPreviousValue) * Number(formattedCurrentValue);
    } else if (previousExpression === '-') {
      total = Number(formattedPreviousValue) - Number(formattedCurrentValue);
    } else if (previousExpression === '+') {
      total = Number(formattedPreviousValue) + Number(formattedCurrentValue);
    }

    const resultsHistory: string[] = JSON.parse(
      localStorage.getItem(localStorageKeys.RESULTS_HISTORY) || '[]',
    );
    if (total - Math.floor(total) !== 0) {
      let totalText = String(total.toFixed(3));
      totalText = totalText.endsWith('0')
        ? removeZerosAtEnd(totalText)
        : totalText;
      totalText = totalText.replace('.', ',');

      resultsHistory.push(
        `${String(formattedPreviousValue).replace(
          '.',
          ',',
        )} ${previousExpression} ${String(formattedCurrentValue).replace(
          '.',
          ',',
        )} = ${totalText}`,
      );
      localStorage.setItem(
        localStorageKeys.RESULTS_HISTORY,
        JSON.stringify(resultsHistory),
      );
      return totalText;
    }

    resultsHistory.push(
      `${String(formattedPreviousValue).replace(
        '.',
        ',',
      )} ${previousExpression} ${String(formattedCurrentValue).replace(
        '.',
        ',',
      )} = ${total}`,
    );
    localStorage.setItem(
      localStorageKeys.RESULTS_HISTORY,
      JSON.stringify(resultsHistory),
    );
    return String(total);
  }

  function removeZerosAtEnd(value: string): string {
    return value.endsWith('0')
      ? removeZerosAtEnd(value.slice(0, value.length - 1))
      : value;
  }

  return {
    displayData,
    handleButtonClick,
    handleBackspaceClick,
    handleHistoryExpressionClick,
    handleHistoryResultClick,
  };
}
