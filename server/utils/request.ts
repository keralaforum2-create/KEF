import type { Request } from 'express';

export function resolveBaseUrl(req: Request): string {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
  
  let host = req.headers['x-forwarded-host'] as string;
  
  if (!host) {
    host = req.headers['host'] as string;
  }
  
  if (!host || host.includes('localhost') || host.includes('127.0.0.1')) {
    const replitDomains = process.env.REPLIT_DOMAINS;
    if (replitDomains) {
      host = replitDomains.split(',')[0].trim();
    }
  }
  
  if (!host) {
    const devDomain = process.env.REPLIT_DEV_DOMAIN;
    if (devDomain) {
      host = devDomain;
    }
  }
  
  if (!host) {
    console.warn('Could not determine host, using fallback');
    host = 'localhost:5000';
  }
  
  if (host.includes('.repl.co') || host.includes('.replit.dev') || host.includes('.replit.app')) {
    return `https://${host}`;
  }
  
  return `${protocol}://${host}`;
}
