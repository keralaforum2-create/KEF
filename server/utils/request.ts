import type { Request } from 'express';

export function resolveBaseUrl(req: Request): string {
  const protocol = (req.headers['x-forwarded-proto'] as string) || 'https';
  
  let host = req.headers['x-forwarded-host'] as string;
  
  if (!host) {
    host = req.headers['host'] as string;
  }
  
  // In production on Replit, prioritize Replit domains
  if (process.env.NODE_ENV === 'production') {
    // Check for Replit deployment domain first
    const replitDomains = process.env.REPLIT_DOMAINS;
    if (replitDomains) {
      const primaryDomain = replitDomains.split(',')[0].trim();
      if (primaryDomain.includes('.replit.app')) {
        return `https://${primaryDomain}`;
      }
    }
  }
  
  // Check for Replit dev domain
  if (process.env.REPLIT_DEV_DOMAIN) {
    return `https://${process.env.REPLIT_DEV_DOMAIN}`;
  }
  
  // Check for Replit domains
  const replitDomains = process.env.REPLIT_DOMAINS;
  if (replitDomains) {
    const primaryDomain = replitDomains.split(',')[0].trim();
    if (primaryDomain) {
      return `https://${primaryDomain}`;
    }
  }
  
  // Check for Render deployment URL
  if (process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL;
  }
  
  // Check for custom deployment URL
  if (process.env.DEPLOYMENT_URL) {
    return process.env.DEPLOYMENT_URL;
  }
  
  if (!host) {
    console.warn('Could not determine host, using fallback');
    host = 'localhost:5000';
  }
  
  if (host.includes('.repl.co') || host.includes('.replit.dev') || host.includes('.replit.app') || host.includes('.onrender.com')) {
    return `https://${host}`;
  }
  
  return `${protocol}://${host}`;
}
