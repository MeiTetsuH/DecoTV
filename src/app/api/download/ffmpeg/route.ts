import { NextRequest, NextResponse } from 'next/server';

import { verifyApiAuth } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 30;
export const fetchCache = 'force-no-store';

const UNSUPPORTED_MESSAGE =
  '当前 Vercel 部署不支持服务端 FFmpeg；请使用浏览器下载。';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const authResult = verifyApiAuth(request);
  if (!authResult.isValid) {
    return unauthorized();
  }

  if (request.nextUrl.searchParams.has('id')) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json({
    jobs: [],
    runtime: { supported: false, reason: UNSUPPORTED_MESSAGE },
  });
}

export async function POST(request: NextRequest) {
  const authResult = verifyApiAuth(request);
  if (!authResult.isValid) {
    return unauthorized();
  }

  return NextResponse.json(
    {
      error: UNSUPPORTED_MESSAGE,
      recommendation: '请使用“下载当前集”浏览器下载。',
    },
    { status: 501 },
  );
}
