import { rest } from 'msw';
import { knowledgeCheckMock } from './words/knowledgeCheck.mock';
import { url } from '@/lib/utils/url';

export const handlers = [
  rest.get(url('/words/knowledge-check'), (_, res, ctx) => {
    return res(ctx.json(knowledgeCheckMock), ctx.delay(3000));
  }),
];
