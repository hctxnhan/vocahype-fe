import useSWR from 'swr';
import { getKnowledgeCheck } from './api/words/knowledgeCheck';
import { APIData, APIResponse } from './models/APIResponse';
import { Word } from './models/Word';
import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);
  const { data } = useSWR<APIResponse<APIData<Word[]>>>(
    '/words/knowledge-check',
    getKnowledgeCheck
  );

  return (
    <div className="">
      <Button onClick={() => setCount(count + 1)}>Click</Button>
      {JSON.stringify(data)}
    </div>
  );
}

export { App };
