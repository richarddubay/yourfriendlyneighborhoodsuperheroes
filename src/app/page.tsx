import { SendAMessageForm } from '@/components/SendAMessageForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen max-w-[1200px] flex-col items-center justify-center gap-5 p-12 md:p-24'>
      <div className='relative flex place-items-center'>
        <Image
          className='relative'
          src='/yfns_logo.svg'
          alt='Your Friendly Neighborhood Superheroes Logo'
          width={720}
          height={323}
          priority
        />
      </div>
      <div className='flex w-full flex-col gap-5 lg:w-3/4'>
        <h1 className='text-3xl font-bold'>Welcome</h1>
        <p>Your Friendly Neighborhood Superheroes will be here before you know it.</p>
        <p>
          In the meantime, if you would like to get in touch with us, please fill out the form below and we&apos;ll get
          back to you in a flash. Get it? Flash? 🙈
        </p>
        <SendAMessageForm />
      </div>
    </main>
  );
}
