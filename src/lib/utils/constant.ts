import { DAILY_GOAL_LEVEL, TopicValue } from '../enums/settings';

export const topicOptions = [
  {
    id: 0,
    value: TopicValue.POLITICS,
    labelString: 'Politics',
    labelEmoji: '🏛️',
    description: 'Words and terms related to politics and government.',
  },
  {
    id: 1,
    value: TopicValue.WELLNESS,
    labelString: 'Wellness',
    labelEmoji: '💪',
    description: 'Vocabulary related to health, fitness, and well-being.',
  },
  {
    id: 2,
    value: TopicValue.ENTERTAINMENT,
    labelString: 'Entertainment',
    labelEmoji: '🎬',
    description: 'Words associated with movies, music, and pop culture.',
  },
  {
    id: 3,
    value: TopicValue.PARENTING,
    labelString: 'Parenting',
    labelEmoji: '👨‍👩‍👧',
    description: 'Terms relevant to raising children and parenting.',
  },
  {
    id: 4,
    value: TopicValue.STYLE_AND_BEAUTY,
    labelString: 'Style & Beauty',
    labelEmoji: '💄',
    description: 'Fashion and beauty-related vocabulary.',
  },
  {
    id: 5,
    value: TopicValue.GROUPS_VOICES,
    labelString: 'Group Voices',
    labelEmoji: '🗣️',
    description: 'Words and phrases associated with community and groups.',
  },
  {
    id: 6,
    value: TopicValue.TRAVEL,
    labelString: 'Travel',
    labelEmoji: '✈️',
    description: 'Vocabulary for exploring the world and traveling.',
  },
  {
    id: 7,
    value: TopicValue.FOOD_AND_DRINK,
    labelString: 'Food & Drink',
    labelEmoji: '🍔',
    description: 'Words related to cuisine, dining, and beverages.',
  },
  {
    id: 8,
    value: TopicValue.WORLD_NEWS,
    labelString: 'World News',
    labelEmoji: '🌍',
    description: 'Terms for global news and current events.',
  },
  {
    id: 9,
    value: TopicValue.BUSINESS_AND_FINANCE,
    labelString: 'Business & Finance',
    labelEmoji: '💼',
    description: 'Vocabulary associated with economics and finance.',
  },
  {
    id: 10,
    value: TopicValue.COMEDY,
    labelString: 'Comedy',
    labelEmoji: '🤣',
    description: 'Words and humor-related terms for comedy enthusiasts.',
  },
  {
    id: 11,
    value: TopicValue.SPORTS,
    labelString: 'Sports',
    labelEmoji: '⚽',
    description: 'Terms for various sports and athletic activities.',
  },
  {
    id: 12,
    value: TopicValue.HOME_AND_LIVING,
    labelString: 'Home & Living',
    labelEmoji: '🏡',
    description: 'Vocabulary for home, interior design, and lifestyle.',
  },
  {
    id: 13,
    value: TopicValue.SCIENCE_AND_TECH,
    labelString: 'Science & Tech',
    labelEmoji: '🔬',
    description: 'Words related to science and technology innovations.',
  },
  {
    id: 14,
    value: TopicValue.WEDDINGS,
    labelString: 'Weddings',
    labelEmoji: '💒',
    description: 'Vocabulary for weddings and matrimonial ceremonies.',
  },
  {
    id: 15,
    value: TopicValue.ENVIRONMENT,
    labelString: 'Environment',
    labelEmoji: '🌱',
    description: 'Terms related to ecology and the natural world.',
  },
  {
    id: 16,
    value: TopicValue.NONE,
    labelString: 'None',
    labelEmoji: '',
    description: 'Words from all topics will be included.',
  },
];

export const goalSettingOptions = [
  {
    id: 0,
    value: DAILY_GOAL_LEVEL.BASIC,
    label: 'BASIC 💤',
    time: 5,
    description:
      'The Basic setting is perfect for beginners or individuals with limited time to spare.',
  },
  {
    id: 1,
    value: DAILY_GOAL_LEVEL.CASUAL,
    label: 'CASUAL 💗',
    time: 10,
    description:
      'The Casual setting is designed for learners who prefer a relaxed pace but still want to make consistent progress.',
  },
  {
    id: 2,
    value: DAILY_GOAL_LEVEL.REGULAR,
    label: 'REGULAR 💦',
    time: 15,
    description:
      'The Regular setting is suitable for learners looking for a balanced approach to English language learning.',
  },
  {
    id: 3,
    value: DAILY_GOAL_LEVEL.SERIOUS,
    label: 'SERIOUS 🔥',
    time: 20,
    description:
      'The Serious setting is ideal for learners committed to making substantial progress in a shorter time frame.',
  },
  {
    id: 4,
    value: DAILY_GOAL_LEVEL.CHALLENGE,
    label: 'CHALLENGE 💢',
    time: 25,
    description:
      'The Challenge setting is designed for learners seeking a more intensive learning experience.',
  },
  {
    id: 5,
    value: DAILY_GOAL_LEVEL.HARDCORE,
    label: 'EXTREME 🌊',
    time: 30,
    description:
      'The Hardcore setting is for highly motivated learners who are ready to immerse themselves fully in English language learning.',
  },
];