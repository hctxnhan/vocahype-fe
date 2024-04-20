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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Schema = z.object({
  word: z.string(),
  syllable: z.number(),
  phonetic: z.string(),
  point: z.number(),
  meanings: z.array(
    z.object({
      pos: z.string(),
      definitions: z.array(
        z.object({
          definition: z.string(),
          examples: z.array(
            z.object({
              example: z.string(),
            })
          ),
        })
      ),
    })
  ),
});

type WordFormValues = z.infer<typeof Schema>;
type TransformWordFormValues = {
  meanings: {
    definitions: {
      examples: string[];
      definition: string;
    }[];
    pos: string;
  }[];
  phonetic: string;
  point: number;
  syllable: number;
  word: string;
};

interface WordFormProps {
  defaultValues?: TransformWordFormValues;
  onSubmit?: (data: TransformWordFormValues) => void;
}

export function WordForm({ defaultValues, onSubmit }: WordFormProps) {
  const transformedDefaultValues: WordFormValues = {
    word: '',
    syllable: 0,
    phonetic: '',
    point: 0,
    meanings:
      defaultValues?.meanings.map(m => ({
        pos: m.pos,
        definitions: m.definitions.map(d => ({
          definition: d.definition,
          examples: d.examples.map(e => ({ example: e })),
        })),
      })) || [],
  };

  const { control, register, handleSubmit } = useForm<WordFormValues>({
    defaultValues: transformedDefaultValues,
    resolver: zodResolver(Schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meanings',
  });

  function submit(data: WordFormValues) {
    const transformedData: TransformWordFormValues = {
      ...data,
      meanings: data.meanings.map(m => ({
        ...m,
        definitions: m.definitions.map(d => ({
          ...d,
          examples: d.examples.map(e => e.example),
        })),
      })),
    };

    onSubmit?.(transformedData);
  }

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <Input placeholder="Enter word" {...register('word')} />
        <Input placeholder="Enter syllable" {...register('syllable')} />
        <Input placeholder="Enter phonetic" {...register('phonetic')} />
        <Input placeholder="Enter point" {...register('point')} />
        <p className="font-bold">Meanings</p>
        {fields.map((f, index) => (
          <div key={f.id} className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-2">
              <Controller
                control={control}
                name={`meanings.${index}.pos`}
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Part of speech" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nn">Noun</SelectItem>
                        <SelectItem value="adj">Adjective</SelectItem>
                        <SelectItem value="v">Verb</SelectItem>
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
              pos: '',
              definitions: [],
            })
          }
        >
          Meaning
          <Plus size={16} />
        </Button>
      </div>

      <Button onClick={void handleSubmit(submit)}>Submit</Button>
    </div>
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
