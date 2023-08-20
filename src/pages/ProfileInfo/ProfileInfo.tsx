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
import { updateProfileFormScheme } from '@/lib/formScheme/updateProfileFormScheme';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function ProfileInfo() {
  const { user } = useAuthState();

  const form = useForm<z.infer<typeof updateProfileFormScheme>>({
    resolver: zodResolver(updateProfileFormScheme),
  });

  function onSubmit(data: z.infer<typeof updateProfileFormScheme>) {
    console.log(data);
  }

  useEffect(() => {
    form.reset({
      email: user?.email || undefined,
      name: user?.displayName || undefined,
      phoneNumber: user?.phoneNumber || undefined,
      avatar: user?.photoURL || undefined,
    });
  }, [user]);

  return (
    <FillParent>
      <Card className="w-[500px] gap-4 bg-white/80">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit) as VoidFunction}>
            <CardHeader className="center mx-auto max-w-[350px] gap-2">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="space-y-1 text-center">
                    <Label htmlFor="avatar">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Label>
                    <FormControl>
                      <Input
                        accept="image/jpg, image/png, image/jpeg"
                        className="hidden"
                        id="avatar"
                        type="file"
                        {...field}
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
            <CardContent className="space-y-2">
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
                      <Input placeholder="+84 123 123 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                variant={'link'}
                className="text-red-500 hover:text-red-500/90"
              >
                Delete account
              </Button>
              <Button>Update</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </FillParent>
  );
}
