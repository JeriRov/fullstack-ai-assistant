import { NextFunction, Response, Request } from 'express';
import { openai } from 'openai.config';

const model = 'gpt-3.5-turbo';

export const testMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInput = req.body.userInput;
    console.log(userInput);

    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ 'role': 'user', 'content': 'You are a helpful assistant.' }],
    });

    res.json(completion.data.choices[0].message);
  } catch (error) {
    next(error);
  }
};
