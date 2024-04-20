import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSetBreadcrumb } from '@/lib/hooks/useSetBreadcrumb';

import { AddWordManuallyForm } from './AddWordManuallyForm';
import { UploadSrtSubtitle } from './UploadSrtSubtitle';

export function CreateTopic() {
  useSetBreadcrumb([
    {
      label: 'Admin',
      href: '/admin',
    },
    'Create Topic',
  ]);

  return (
    <div className='w-full'>
      <Input placeholder="Topic name" className='text-3xl uppercase border-none focus-visible:ring-0 mb-4 p-0'/>
      <Tabs defaultValue="manually">
        <TabsList className='mb-2'>
          <TabsTrigger value="manually">Add word manually</TabsTrigger>
          <TabsTrigger value="subtitle">From .srt subtitle</TabsTrigger>
        </TabsList>
        <TabsContent value="manually">
          <AddWordManuallyForm />
        </TabsContent>
        <TabsContent value="subtitle">
          <UploadSrtSubtitle />
        </TabsContent>
      </Tabs>
    </div>
  );
}
