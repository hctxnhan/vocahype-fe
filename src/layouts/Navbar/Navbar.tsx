import { Button } from '@/components/primitives/Button';

export function Navbar() {
  return (
    <div className="flex justify-between">
      <div>
        <Button uppercase className='min-w-[200px]'>Home</Button>
        <Button uppercase className='min-w-[200px]'>Learning</Button>
        <Button uppercase className='min-w-[200px]'>Practice</Button>
      </div>
      <div>
        <Button uppercase className='min-w-[200px]'>Login</Button>
        <Button uppercase className='min-w-[200px]' variant="solid">
          Get started
        </Button>
      </div>
    </div>
  );
}
