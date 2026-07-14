import { NextRequest, NextResponse } from 'next/server';

import { verifyApiAuth } from '@/lib/auth';

export const runtime = 'nodejs';
export const maxDuration = 30;
export const fetchCache = 'force-no-store';

export async function GET(request: NextRequest) {
  const authResult = verifyApiAuth(request);
  if (!authResult.isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(
    {
      error: '当前 Vercel 部署不支持服务端 FFmpeg 文件下载。',
      recommendation: '请使用“下载当前集”浏览器下载。',
    },
    { status: 501 },
  );
}
