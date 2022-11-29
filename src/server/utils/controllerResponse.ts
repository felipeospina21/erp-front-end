import type { NextApiResponse } from 'next';
import type { ModelTypes } from '../mongoose/helpers';

// TODO: refactor error response to iherit error object
export function controllerResponse<T = ModelTypes | ModelTypes[]>(
  serviceResponse: T,
  resStatus: number,
  errStatus: number,
  res: NextApiResponse
): void {
  if (serviceResponse) {
    res.status(resStatus).json(serviceResponse);
  } else {
    res.status(errStatus).json({ msg: 'error' });
  }
}