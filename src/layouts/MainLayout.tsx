import { PropsWithChildren } from 'react';
import { Navbar } from './Navbar/Navbar';


export function MainLayout(props: PropsWithChildren) {
  return <div className='flex flex-col gap-8'>
    <Navbar />
    {props.children}
  </div>;
}
