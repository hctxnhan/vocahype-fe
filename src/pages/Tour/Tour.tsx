import * as R from 'ramda';
import { useEffect, useState } from 'react';
import ReactTour from 'reactour';
import { useLocation } from 'wouter';

import { Button } from '@/components/ui/button';
import {
  defaultTourData,
  explorationTourSteps,
  layoutTourSteps,
  learnPageTourStep,
  learnWordPageTourSteps,
} from '@/lib/configs/tour';
import { testPathRegex, whatIsCurrentPage } from '@/lib/utils/utils';

function getTourData() {
  const tour: string | null = localStorage.getItem('tour');

  if (!tour) return null;

  const tourData = JSON.parse(tour) as {
    path: string;
    done: boolean;
  }[];

  return tourData;
}

function getTour(
  testPathRegex: (path: string) => RegExp,
  chooseTourSteps: (isLayoutStep: boolean) => {
    selector: string;
    content: string;
  }[],
  path: string
) {
  const tourData = getTourData();
  if (!tourData) return null;

  const isLayoutStep = (tour: { path: string; done: boolean }) =>
    tour.path === 'layout' && !tour.done;

  const isPageStep = (tour: { path: string; done: boolean }) =>
    testPathRegex(tour.path).test(path) && !tour.done && !isLayoutStep(tour);

  const currentTour = tourData.find(R.either(isLayoutStep, isPageStep));

  if (currentTour) {
    return {
      ...currentTour,
      steps: chooseTourSteps(isLayoutStep(currentTour)),
    };
  }

  return null;
}

function chooseTourSteps(
  testCurrentPage: ReturnType<typeof whatIsCurrentPage>,
  isLayoutStep: boolean
) {
  if (isLayoutStep) return layoutTourSteps;

  if (testCurrentPage.learn) return learnPageTourStep;
  else if (testCurrentPage.exploration) return explorationTourSteps;
  else if (testCurrentPage.learnWord) return learnWordPageTourSteps;
  else return [];
}

export function Tour() {
  const [path] = useLocation();
  const [isTourOpen, setIsTourOpen] = useState(false);

  const [currentTour, setCurrentTour] = useState<{
    path: string;
    done: boolean;
    steps: {
      selector: string;
      content: string;
    }[];
  } | null>(null);

  const testCurrentPage = whatIsCurrentPage(path);
  const chooseTourStepsCurry = R.curry(chooseTourSteps)(testCurrentPage);
  const getCurrentTour = R.curry(getTour)(testPathRegex, chooseTourStepsCurry);

  useEffect(() => {
    const tourData = getTourData();
    if (!tourData) {
      localStorage.setItem('tour', JSON.stringify(defaultTourData));

      return;
    }

    const tour = getCurrentTour(path);
    setCurrentTour(tour);
  }, [path]);

  function handleFinishTour() {
    const tourData = getTourData();

    const isLayoutTour = (tour: { path: string; done: boolean }) =>
      tour.path === 'layout' && currentTour?.path === 'layout';

    const isPageTour = (tour: { path: string; done: boolean }) =>
      currentTour?.path === tour.path && !isLayoutTour(tour);

    const newTourData = tourData!.map(tour => {
      if (isLayoutTour(tour) || isPageTour(tour)) {
        return {
          ...tour,
          done: true,
        };
      }

      return tour;
    });

    localStorage.setItem('tour', JSON.stringify(newTourData));

    const tour = getCurrentTour(path);
    setCurrentTour(tour);
  }

  return (
    <div className="relative">
      {!!currentTour?.steps.length && !currentTour?.done && (
        <span className="absolute bottom-full right-0 z-[1] flex h-3 w-3 translate-x-[10%] translate-y-[70%]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
        </span>
      )}
      {!!currentTour?.steps.length && (
        <>
          <Button
            variant={'outline'}
            size={'sm'}
            className="relative"
            onClick={() => setIsTourOpen(true)}
          >
            Tutorial
          </Button>
          <ReactTour
            key={currentTour?.path}
            isOpen={isTourOpen}
            className="!bg-muted !text-foreground"
            rounded={8}
            onRequestClose={() => setIsTourOpen(false)}
            steps={currentTour?.steps}
            lastStepNextButton={
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => {
                  handleFinishTour();
                  setIsTourOpen(false);
                }}
              >
                Finish
              </Button>
            }
            disableInteraction
          />
        </>
      )}
    </div>
  );
}
