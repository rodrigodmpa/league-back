import { Request, Response, NextFunction } from 'express';

function logRequests(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next(null);
  console.timeEnd(logLabel);
}

export default logRequests;
