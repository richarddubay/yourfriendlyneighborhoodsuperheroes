'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().max(1000, {
    message: 'Your message cannot be longer than 1000 characters.',
  }),
  name: z.string().min(2, {
    message: 'Name is required and must be at least 2 characters.',
  }),
});

export const SendAMessageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.email = DOMPurify.sanitize(values.email);
    values.message = DOMPurify.sanitize(values.message);
    values.name = DOMPurify.sanitize(values.name);
    try {
      const apiRes = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          message: values.message,
          name: values.name,
        }),
      });

      const response = await apiRes.json();
      console.log('response = ', response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log('The form should reset.');
      form.reset();
      console.log('form.reset() was called.');
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Your email address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='Your message to YFNS' className='resize-none' {...field} />
              </FormControl>
              <FormDescription>Kindly keep your message to 1000 characters please!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
