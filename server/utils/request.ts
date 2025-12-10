import type { Request } from 'express';

export function resolveBaseUrl(req: Request): string {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
  
  let host = req.headers['x-forwarded-host'] as string;
  
  if (!host) {
    host = req.headers['host'] as string;
  }
  
  // Check for Render deployment URL first
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL;
  }
  
  // Check for custom deployment URL
  if (process.env.DEPLOYMENT_URL) {
    return process.env.DEPLOYMENT_URL;
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
    // Use Render URL as default fallback for production
    host = 'kef-e3hu.onrender.com';
  }
  
  if (host.includes('.repl.co') || host.includes('.replit.dev') || host.includes('.replit.app') || host.includes('.onrender.com')) {
    return `https://${host}`;
  }
  
  return `${protocol}://${host}`;
}
