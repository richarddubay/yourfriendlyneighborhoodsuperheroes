import { sendEmail } from '@/service/mailService';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
  message: z.string().max(1000),
  name: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = schema.parse(body);
    await sendEmail(validatedBody.email, validatedBody.message, validatedBody.name);
    return new Response(JSON.stringify('Success'), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
