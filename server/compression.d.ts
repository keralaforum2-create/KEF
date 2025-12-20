declare module 'compression' {
  import type { RequestHandler } from 'express';
  
  interface CompressionOptions {
    filter?: (req: any, res: any) => boolean;
    level?: number;
    memLevel?: number;
    strategy?: number;
    threshold?: number | string;
    chunkSize?: number;
    [key: string]: any;
  }
  
  function compression(options?: CompressionOptions): RequestHandler;
  
  namespace compression {
    function filter(req: any, res: any): boolean;
  }
  
  export = compression;
}
