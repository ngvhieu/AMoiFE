import fetcher from '@/common/utils/fetcher';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const response = await fetcher<any>({
      path: '/users',
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
