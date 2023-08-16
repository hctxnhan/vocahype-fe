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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthState } from '@/lib/hooks/firebase/auth/useAuthState';

export function ProfileInfo() {
  const { user } = useAuthState();
  return (
    <FillParent>
      <Card className="w-[500px] gap-4 bg-white/80">
        <CardHeader className="center mx-auto max-w-[350px] gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>{user?.displayName}</CardTitle>
          <CardDescription className="text-center">
            {
              'This is your bio description. So its content is up to you. I don’t give a shit =))))'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="lionelmessy@gmail.com" />
          </div>
          <div className="space-y-1">
            <Label>Name</Label>
            <Input type="password" placeholder="Lionel Messy" />
          </div>
          <div className="space-y-1">
            <Label>Phone number</Label>
            <Input type="phone" placeholder="+84 123 123 123" />
          </div>
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
      </Card>
    </FillParent>
  );
}
