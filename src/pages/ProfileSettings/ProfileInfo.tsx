import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
  sendVerificationEmail,
  updateProfileUser,
} from '@/lib/configs/firebaseAuth';
import { updateProfileFormScheme } from '@/lib/formScheme/updateProfileFormScheme';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { useAsyncAction } from '@/lib/hooks/useAsyncAction';
import { useToast } from '@/lib/hooks/useToast';
import { cn, getFirstNLetter } from '@/lib/utils/utils';

export function ProfileInfo() {
  const { user } = useAuthState();
  const emailVerified = user?.emailVerified || false;

  const toast = useToast('Update  Profile');
  const [previewImg, setPreviewImg] = useState<string | null>();

  const form = useForm<z.infer<typeof updateProfileFormScheme>>({
    resolver: zodResolver(updateProfileFormScheme),
  });

  const updateProfileAction = useAsyncAction<typeof updateProfileUser>(
    updateProfileUser,
    {
      onSuccess: () => {
        toast.success({
          title: 'Update profile',
          msg: 'Successfully update profile',
        });
      },
      onError: error => {
        toast.error({
          title: 'Update profile',
          msg: error.message,
        });
      },
    }
  );

  const sendEmailVerificationAction = useAsyncAction(sendVerificationEmail, {
    onSuccess: () => {
      toast.success({
        title: 'Verification email',
        msg: 'A verification email has been sent to your email address. Please check your email and click on the link provided to verify your email address.',
      });
    },
    onError: error => {
      toast.error({
        title: 'Verification email',
        msg: error.message,
      });
    },
  });

  function onSubmit(data: z.infer<typeof updateProfileFormScheme>) {
    updateProfileAction.start([data.email, data.name, data.avatar || '']);
  }

  const onAvatarChange =
    (onChange: (...args: any[]) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
          onChange(e.target.files[0]);
          setPreviewImg(URL.createObjectURL(e.target.files[0]));
        }
      };

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
    <Card className="gap-4 border-none bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
          <CardHeader className="center mx-auto max-w-[350px] gap-2">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <FormItem className="space-y-1 text-center">
                  <Label htmlFor="avatar">
                    <Avatar className="relative h-20 w-20">
                      {previewImg && <AvatarImage src={previewImg} />}
                      <AvatarFallback>
                        {getFirstNLetter(user?.displayName || '', 2)}
                      </AvatarFallback>
                      <div className="absolute flex h-full w-full items-center justify-center bg-slate-900/50 text-white opacity-0 transition-opacity hover:cursor-pointer hover:opacity-100">
                        Change
                      </div>
                    </Avatar>
                  </Label>
                  <FormControl>
                    <Input
                      accept="image/jpg, image/png, image/jpeg"
                      className="hidden"
                      id="avatar"
                      type="file"
                      onChange={onAvatarChange(onChange)}
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
                  <FormLabel>
                    Email ({emailVerified ? 'Verified' : 'Unverified'})
                    <Button
                      className={cn({
                        hidden: emailVerified,
                      })}
                      type="button"
                      onClick={() => sendEmailVerificationAction.start()}
                      variant={'link'}
                    >
                      Send verification
                    </Button>
                  </FormLabel>
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
                    <Input disabled placeholder="+84 123 123 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="vh-flex-column flex-1 items-center gap-1">
              <div className="text-sm text-red-700 hover:cursor-pointer">
                Delete account
              </div>
              <LoadingButton
                className="w-full bg-brand-600 py-3 text-sm leading-6"
                type="submit"
                isLoading={updateProfileAction.isLoading}
              >
                Update
              </LoadingButton>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
