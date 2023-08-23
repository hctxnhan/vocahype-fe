import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface IStepScreen {
  screen: ReactNode;
}

export const multiScreenContext = createContext<{
  nextScreen: () => void;
  prevScreen: () => void;
  isLastStep: () => boolean;
    } | null>(null);

export type GenericEventHandler = () => void;

export function useMultistep(
  optionsInput: Array<IStepScreen>,
  configs?: {
    onFinish?: GenericEventHandler;
    onExit?: GenericEventHandler;
  }
) {
  const options = useMemo(() => {
    return optionsInput;
  }, []);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepCount = options.length;

  const nextScreen = useCallback(
    function () {
      if (currentStep === stepCount - 1) configs?.onFinish?.();
      const nextNonSkipStep = currentStep + 1;

      setCurrentStep(nextNonSkipStep);
    },
    [currentStep, configs?.onFinish, stepCount]
  );

  const prevScreen = useCallback(
    function prevScreen() {
      if (currentStep === 0) {
        configs?.onExit?.();
        return;
      }

      const prevFirstNonSkipStep = currentStep - 1;
      setCurrentStep(prevFirstNonSkipStep);
    },
    [currentStep, configs?.onExit]
  );

  function isLastStep() {
    return currentStep === stepCount - 1;
  }

  const currentScreen = (
    <multiScreenContext.Provider
      value={{
        isLastStep,
        nextScreen,
        prevScreen,
      }}
    >
      {options[currentStep].screen}
    </multiScreenContext.Provider>
  );

  return {
    nextScreen,
    prevScreen,
    isLastStep,
    currentStep,
    currentScreen,
  };
}
