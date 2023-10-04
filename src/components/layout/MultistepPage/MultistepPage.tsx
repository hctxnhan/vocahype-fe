import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  LoadingButton,
  LoadingButtonProps,
} from '@/components/ui/loading-button';
import { checkChildren } from '@/lib/utils/checkChildren';

type ValidateFunction = () => boolean | Promise<boolean>;

const multiStepContext = createContext<{
  nextStep: () => Promise<void>;
  prevStep: () => void;
  isLastStep: boolean;
  currentStep: number;
  totalSteps: number;
  setValidateCurrentStep: (validate: ValidateFunction) => void;
}>({
  nextStep: () => Promise.resolve(),
  prevStep: () => void {},
  setValidateCurrentStep: () => void {},
  isLastStep: false,
  currentStep: 0,
  totalSteps: 0,
});

export function useMultiStep() {
  const context = useContext(multiStepContext);
  if (!context) {
    throw new Error('useMultiStep must be used within a MultiStepProvider');
  }
  return context;
}

interface RootProps {
  children: React.ReactNode;
  onFinish?: () => void;
  onExit?: () => void;
  className?: string;
  stepCount: number;
}
export function Root({
  children,
  onExit,
  onFinish,
  className,
  stepCount,
}: RootProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [validateCurrentStep, setValidateCurrentStep] =
    useState<ValidateFunction>(() => true)

  async function nextStep() {
    if (!(await validateCurrentStep())) return;

    if (currentStep === stepCount - 1) {
      onFinish?.();
      return;
    }
    const nextStep = currentStep + 1;

    setCurrentStep(nextStep);
  }

  function prevStep() {
    if (currentStep === 0) {
      onExit?.();
      return;
    }

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
  }

  const isAtLastStep = currentStep === stepCount - 1;

  return (
    <multiStepContext.Provider
      value={{
        nextStep,
        prevStep,
        currentStep,
        isLastStep: isAtLastStep,
        totalSteps: stepCount,
        setValidateCurrentStep,
      }}
    >
      <div className={className}>{children}</div>
    </multiStepContext.Provider>
  );
}

export function StepContainer({ children }: { children: React.ReactNode }) {
  const { currentStep, totalSteps, setValidateCurrentStep } = useMultiStep();
  const validChildren = checkChildren(children, Step);

  if (currentStep >= totalSteps) {
    throw new Error('currentStep cannot be greater than totalSteps');
  }

  if (validChildren.length !== totalSteps) {
    throw new Error(
      'StepContainer must have the same number of children as the totalSteps'
    );
  }

  useEffect(() => {
    setValidateCurrentStep(() => {
      // eslint-disable-next-line
      return validChildren[currentStep].props.preCondition ?? (() => true);
    });
  }, [currentStep, setValidateCurrentStep]);

  return cloneElement(validChildren[currentStep], {
    key: currentStep,
  });
}

interface StepProps {
  children: React.ReactNode;
  preCondition?: () => boolean | Promise<boolean>;
}
export function Step({ children }: StepProps) {
  return children as React.ReactElement;
}

interface NextButtonProps extends Omit<LoadingButtonProps, 'onClick'> {
  lastStepText?: string;
  nextStepText?: string;
}

export function NextButton({
  lastStepText = 'Submit',
  nextStepText = 'Next',
  children,
  ...props
}: NextButtonProps) {
  const { nextStep, isLastStep } = useMultiStep();

  return (
    <LoadingButton onClick={nextStep as VoidFunction} {...props}>
      {children ?? (isLastStep ? lastStepText : nextStepText)}
    </LoadingButton>
  );
}

export const MultiStepPage = {
  Root,
  StepContainer,
  Step,
  NextButton,
};
