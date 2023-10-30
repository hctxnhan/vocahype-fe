import * as R from 'ramda';

import { dataAttrSelector } from '../utils/utils';

export const TOUR_STEPS = {
  SIDEBAR: {
    LEARN: 'tour-step-sidebar-learn',
    KNOWLEDGE_CHECK: 'tour-step-sidebar-knowledge-check',
    EXPLORATION: 'tour-step-sidebar-exploration',
    LEARN_TIME: 'tour-step-sidebar-learn-time',
  },
  NAVBAR: {
    SEARCHBAR: {
      INPUT: 'tour-step-navbar-searchbar-input',
      BUTTON: 'tour-step-navbar-searchbar-button',
      TOGGLE: 'tour-step-navbar-searchbar-toggle',
    },
    PROFILE: 'tour-step-navbar-profile',
    DARK_MODE: 'tour-step-navbar-dark-mode',
  },
  WORD_LIST: {
    LIST: 'tour-step-word-list-list',
    CARD: {
      CONTAINER: 'tour-step-word-list-card-container',
      STATUS: 'tour-step-word-list-card-status',
      IGNORE: 'tour-step-word-list-card-ignore',
      LEARN: 'tour-step-word-list-card-learn',
      DELAY: 'tour-step-word-list-card-delay',
    },
  },
  EXPLORATION: {
    SECTION: 'tour-step-exploration-section',
    TOPIC: 'tour-step-exploration-topic',
    PROGRESSION: 'tour-step-exploration-progression',
  },
  WORD: {
    DETAIL: 'tour-step-word-detail',
    DEFINITION: 'tour-step-word-definition',
    EXAMPLE: 'tour-step-word-example',
    SYNONYM: 'tour-step-word-synonym',
    LEARN_BUTTON: {
      CONTAINER: 'tour-step-word-learn-button-container',
      IGNORE: 'tour-step-word-learn-button-ignore',
      HARD: 'tour-step-word-learn-button-hard',
      MASTERED: 'tour-step-word-learn-button-mastered',
      REMAINING: 'tour-step-word-learn-button-remaining',
    },
  },
};
export const tourDataSelector = R.curry(dataAttrSelector)('tour');

export const layoutTourSteps = [
  {
    selector: tourDataSelector(TOUR_STEPS.SIDEBAR.LEARN),
    content:
      "You can access the learning page here, where all the words you're learning are shown.",
  },
  {
    selector: tourDataSelector(TOUR_STEPS.SIDEBAR.KNOWLEDGE_CHECK),
    content:
      'To save you from wasting time on words you already know, we have a knowledge check page where you can estimate your vocabulary size, so we can skip those words for you.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.SIDEBAR.EXPLORATION),
    content:
      'Maybe you are interested in a specific topic, so you want to learn words from that topic first. You can do that here.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.SIDEBAR.LEARN_TIME),
    content:
      'You can set a daily goal for yourself and see how much time you have spent learning today. The daily goal can be changed in the settings page.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.NAVBAR.SEARCHBAR.INPUT),
    content:
      'If you want to learn a specific word, you can search for it here.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.NAVBAR.SEARCHBAR.TOGGLE),
    content:
      'Sometimes you want to search for exact matching words. You can toggle this option here.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.NAVBAR.PROFILE),
    content:
      'You can access your profile here. Like edit your profile info, change your password, update your daily goal, focus topic, or just log out.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.NAVBAR.DARK_MODE),
    content: 'You can toggle dark mode here. Everyone loves dark mode!',
  },
];

export const learnPageTourStep = [
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.LIST),
    content:
      'This is the list of words you are learning and going to learn today. Have a look at it!',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.CARD.CONTAINER),
    content:
      'This is a word card. You can see the word itself here, the learning status, due date if any, and some actions you can do with the word.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.CARD.STATUS),
    content:
      'This is the learning status of the word. "LEARNING" means you are learning the word, we are tracking the progression of your learning with that word, "TO LEARN" means you have not learned the word yet.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.CARD.IGNORE),
    content:
      "If you think you won't need to learn this word, you can ignore it. It will be added to your ignore list, and you won't see it again.",
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.CARD.DELAY),
    content:
      'Today is not a good day to learn this word? You can delay it to another day.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD_LIST.CARD.LEARN),
    content:
      'But you ARE ready to knock this word out of the park? Click here to learn it!',
  },
];

export const explorationTourSteps = [
  {
    selector: tourDataSelector(TOUR_STEPS.EXPLORATION.SECTION),
    content:
      'This is the list of topics you can learn. You can choose one topic to learn from here.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.EXPLORATION.TOPIC),
    content:
      'This is a topic. Each topic contains a list of words that related to that topic you should learn. Click on it will take you to the learning page of that topic.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.EXPLORATION.PROGRESSION),
    content:
      'This is progression bar, you can see the number of words in this topic, and the number of words you have learned in this topic. This bar over here will help you visualize your progression.',
  },
];

export const learnWordPageTourSteps = [
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.DETAIL),
    content:
      'This is the word detail page. You can see the word itself here, the pronunciation, the part of speech and also pronunciation of the word.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.DEFINITION),
    content:
      'This is the definition of the word. Some words have more than one meaning, you can see them all here by clicking on the arrow button if present.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.EXAMPLE),
    content:
      'This is the list of examples of the word. You can see how the word is used in a sentence here.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.SYNONYM),
    content: 'This is the list of synonyms and antonyms of the word.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.LEARN_BUTTON.CONTAINER),
    content:
      'You can click on it to learn the word. If you are not sure about the word, you can take a quiz to test your knowledge.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.LEARN_BUTTON.IGNORE),
    content:
      'If you think you won’t need to learn this word, you can ignore it. It will be added to your ignore list, and you won’t see it again.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.LEARN_BUTTON.HARD),
    content:
      'If you think you need to learn this word more, you can add it to your hard list. The word will appear in your learn list tomorrow.',
  },
  {
    selector: tourDataSelector(TOUR_STEPS.WORD.LEARN_BUTTON.MASTERED),
    content:
      "You've mastered this word? Congrats! You can add it to your mastered list and never see it again!",
  },
];

export const defaultTourData = [
  {
    path: 'layout',
    done: false,
  },
  {
    path: '/',
    done: false,
  },
  {
    path: '/exploration',
    done: false,
  },
  {
    path: '/words/:wordId',
    done: false,
  },
];
