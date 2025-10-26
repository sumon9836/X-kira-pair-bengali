import { NextRequest } from 'next/server';
import { createProxy } from '../../../lib/proxy';

export async function GET(request: NextRequest) {
  const endpoint = '/sessions';
  return createProxy(request, endpoint, 'GET');
}
