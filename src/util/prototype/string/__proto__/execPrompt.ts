/* eslint-disable no-console */
import axios from 'axios';
import config from '../../../../config';

declare global {
  interface String {
    execPrompt(): Promise<string>;
  }
}

String.prototype.execPrompt = async function () {
  const data = {
    model: 'gpt-4',
    messages: [{ role: 'user', content: this }],
    max_tokens: 150,
    temperature: 0.5,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      data,
      {
        headers: {
          Authorization: `Bearer ${config.gpt.key}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return JSON.parse(response.data.choices[0].text.trim());
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export {};
