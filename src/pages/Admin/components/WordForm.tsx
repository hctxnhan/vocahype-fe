import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash } from 'lucide-react';
import { Fragment } from 'react';
import {
  Control,
  Controller,
  UseFormRegister,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

import { SerializedWordFormValues } from '@/api/words/updateWord';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { posTags } from '@/lib/utils/constant';
import { transformWordForm } from '@/lib/utils/transformWordForm';

const Schema = z.object({
  word: z.string({
    required_error: 'Word is required',
  }),
  syllable: z.coerce.number({
    required_error: 'Syllable is required',
  }),
  phonetic: z.string({ required_error: 'Phonetic is required' }),
  point: z.coerce.number({ required_error: 'Point is required' }).min(0).max(1),
  meanings: z.array(
    z.object({
      pos: z.object({
        id: z.string({ required_error: 'Part of speech is required' }),
      }),
      definitions: z.array(
        z.object({
          definition: z.string({ required_error: 'Definition is required' }),
          examples: z.array(
            z.object({
              example: z.string({ required_error: 'Example is required' }),
            })
          ),
        })
      ),
    })
  ),
});

export type WordFormValues = z.infer<typeof Schema>;

type TransformWordFormValues = {
  id: string;
  meanings: {
    definitions: {
      examples: string[];
      definition: string;
    }[];
    pos: {
      id: string;
    };
  }[];
  phonetic: string;
  point: number;
  syllable: number;
  word: string;
};

interface WordFormProps {
  defaultValues?: TransformWordFormValues;
  onSubmit?: (data: SerializedWordFormValues) => void;
  isLoading?: boolean;
}

export function WordForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: WordFormProps) {
  const transformedDefaultValues = {
    ...defaultValues,
    meanings:
      defaultValues?.meanings?.map(m => ({
        pos: m.pos,
        definitions: m.definitions?.map(d => ({
          definition: d?.definition,
          examples: d?.examples?.map(e => ({ example: e })),
        })) || [],
      })) || [],
  } as WordFormValues;

  const form = useForm<WordFormValues>({
    defaultValues: transformedDefaultValues,
    resolver: zodResolver(Schema),
  });

  const { control, register } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meanings',
  });

  function submit(data: WordFormValues) {
    const serializedData = transformWordForm(defaultValues?.id || '', data);
    onSubmit?.(serializedData);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit) as VoidFunction}>
        <div className="flex w-full flex-col gap-4">
          <FormField
            control={control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the word"
                    disabled={false}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phonetic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phonetic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phonetic"
                    disabled={false}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point</FormLabel>
                <FormControl>
                  <Input
                    placeholder="How popular is this word score from 0-1?"
                    type="number"
                    disabled={false}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="syllable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Syllable</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the syllable"
                    type="number"
                    disabled={false}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-bold">Meanings</p>
          {fields.map((f, index) => (
            <div key={f.id} className="flex w-full flex-col gap-4">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name={`meanings.${index}.pos`}
                  render={({ field }) => {
                    return (
                      <Select
                        value={field.value.id}
                        onValueChange={(value: string) => {
                          field.onChange({ id: value });
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Part of speech" />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-72 w-56">
                            {Object.entries(posTags).map(([key, value]) => (
                              <SelectItem key={key} value={key}>
                                {value}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />

                <Button
                  variant={'outline'}
                  size={'icon'}
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash size={16} />
                </Button>
              </div>

              <DefinitionFieldArray
                control={control}
                meaningIndex={index}
                register={register}
              />
            </div>
          ))}
          <Button
            variant={'link'}
            className="items-center gap-1"
            onClick={() =>
              append({
                pos: { id: '' },
                definitions: [],
              })
            }
          >
            Meaning
            <Plus size={16} />
          </Button>
        </div>

        <LoadingButton isLoading={isLoading} className="mt-6" type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}

function DefinitionFieldArray({
  control,
  meaningIndex,
  register,
}: {
  control: Control<WordFormValues>;
  meaningIndex: number;
  register: UseFormRegister<WordFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `meanings.${meaningIndex}.definitions`,
  });

  return (
    <div className="ml-5 flex flex-col gap-4">
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter definition for this meaning"
              key={field.id} // important to include key with field's id
              {...register(
                `meanings.${meaningIndex}.definitions.${index}.definition`
              )}
            />
            <Button
              variant={'outline'}
              size={'icon'}
              type="button"
              onClick={() => remove(index)}
            >
              <Trash size={14} />
            </Button>
          </div>
          <ExampleFieldArray
            control={control}
            meaningIndex={meaningIndex}
            definitionIndex={index}
            register={register}
          />
        </Fragment>
      ))}
      <Button
        variant={'link'}
        onClick={() =>
          append(
            {
              definition: '',
              examples: [],
            },
            { shouldFocus: true }
          )
        }
      >
        Definition
        <Plus size={16} />
      </Button>
    </div>
  );
}

function ExampleFieldArray({
  control,
  meaningIndex,
  definitionIndex,
  register,
}: {
  control: Control<WordFormValues>;
  meaningIndex: number;
  definitionIndex: number;
  register: UseFormRegister<WordFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `meanings.${meaningIndex}.definitions.${definitionIndex}.examples`,
  });

  return (
    <div className="ml-6 flex flex-col gap-2">
      {fields.map((field, index) => (
        <div className="flex gap-2" key={field.id}>
          <Input
            placeholder="Enter example for this definition"
            key={field.id}
            {...register(
              `meanings.${meaningIndex}.definitions.${definitionIndex}.examples.${index}.example`
            )}
          />
          <Button
            variant={'outline'}
            size={'icon'}
            type="button"
            onClick={() => remove(index)}
          >
            <Trash size={14} />
          </Button>
        </div>
      ))}

      <Button
        variant={'link'}
        onClick={() => {
          append(
            {
              example: '',
            },
            { shouldFocus: true }
          );
        }}
      >
        Example
        <Plus size={16} />
      </Button>
    </div>
  );
}
