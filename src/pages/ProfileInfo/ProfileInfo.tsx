import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FillParent } from '@/components/layout/FillParent/FillParent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingButton } from '@/components/ui/loading-button';
import { updateProfileUser } from '@/lib/configs/firebaseAuth';
import { updateProfileFormScheme } from '@/lib/formScheme/updateProfileFormScheme';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { getFirstNLetter } from '@/lib/utils/utils';

export function ProfileInfo() {
  const { user } = useAuthState();
  const toast = useToast('Update  Profile');
  const [previewImg, setPreviewImg] = useState<string | null>();

  const form = useForm<z.infer<typeof updateProfileFormScheme>>({
    resolver: zodResolver(updateProfileFormScheme),
  });

  const { start, isLoading } = useAsyncAction<typeof updateProfileUser>(
    updateProfileUser,
    {
      onSuccess: () => {
        toast.success({
          msg: 'Successfully update profile',
        });
      },
      onError: error => {
        toast.error({
          msg: error.message,
        });
      },
    }
  );

  function onSubmit(data: z.infer<typeof updateProfileFormScheme>) {
    start([data.email, data.name, data.avatar || '']);
  }

  useEffect(() => {
    form.reset({
      email: user?.email || '',
      name: user?.displayName || '',
      phoneNumber: user?.phoneNumber || '',
      avatar: user?.photoURL || '',
    });
    setPreviewImg(user?.photoURL);
  }, [user]);

  return (
    <FillParent>
      <Card className="w-[500px] gap-4 border-none bg-slate-100/50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardHeader className="center mx-auto max-w-[350px] gap-2">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="space-y-1 text-center">
                    <Label htmlFor="avatar">
                      <Avatar className="relative h-20 w-20">
                        {previewImg && <AvatarImage src={previewImg} />}
                        <AvatarFallback>
                          {getFirstNLetter(user?.displayName || '', 2)}
                        </AvatarFallback>
                        <div className="absolute flex h-full w-full items-center justify-center bg-slate-900/50 text-white opacity-0 hover:cursor-pointer hover:opacity-100">
                          Edit
                        </div>
                      </Avatar>
                    </Label>
                    <FormControl>
                      <Input
                        accept="image/jpg, image/png, image/jpeg"
                        className="hidden"
                        id="avatar"
                        type="file"
                        onChange={e => {
                          if (e?.target?.files?.[0]) {
                            field.onChange(e.target.files[0]);
                            setPreviewImg(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardTitle>{user?.displayName}</CardTitle>
              <CardDescription className="text-center">
                {
                  'This is your bio description. So its content is up to you. I don’t give a shit =))))'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="lionelmessy@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lionel Messy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="+84 123 123 123"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="">
              <div className="flex flex-1 flex-col items-center gap-1">
                <div className="text-[14px] font-medium text-red-700 hover:cursor-pointer">
                  Delete account
                </div>
                <LoadingButton
                  className="w-full bg-sky-600 py-3 text-sm leading-6"
                  type="submit"
                  isLoading={isLoading}
                >
                  Continue
                </LoadingButton>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </FillParent>
  );
}
