import { ZodError } from 'zod';

//  { error: [ { code: 'custom', message: 'Invalid input', path: [] } ] }
export const organizeErrorsToPresent = (error: any) => {
  const arrayErros: ZodError[] = JSON.parse(error.message);

  return arrayErros.map((error) => `- ${error.message}`).join('\n');
};
