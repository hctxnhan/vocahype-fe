import { ReactNode, createContext, useCallback, useState } from 'react';

interface IStepScreen {
  screen: ReactNode;
}

export const multiScreenContext = createContext<{
  nextScreen: () => void;
  prevScreen: () => void;
  isLastStep: () => boolean;
    } | null>(null);

export type GenericEventHandler = () => void;

/**
 * This hook is used to manage the state of a multistep form.
 * But this should only be used for case that really complicated.
 * Consider using the `MultiStepPage` compound component instead.
 * @warning This hook is not recommended to be used in most cases.
 **/
export function useMultistep(
  optionsInput: Array<IStepScreen>,
  configs?: {
    onFinish?: GenericEventHandler;
    onExit?: GenericEventHandler;
  }
) {
  const options = optionsInput;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const stepCount = options.length;

  const nextScreen = useCallback(
    function (e?: Event) {
      e?.preventDefault();
      if (currentStep === stepCount - 1) return configs?.onFinish?.();
      const nextStep = currentStep + 1;

      setCurrentStep(nextStep);
    },
    [currentStep, configs?.onFinish, stepCount]
  );

  const prevScreen = useCallback(
    function prevScreen(e?: Event) {
      e?.preventDefault();

      if (currentStep === 0) return configs?.onExit?.();

      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
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
