'use server';

const MODELS = [
  'x-ai/grok-4.1-fast:free',
  'tngtech/deepseek-r1t2-chimera:free',
  'kwaipilot/kat-coder-pro:free',
  'z-ai/glm-4.5-air:free',
  'tngtech/deepseek-r1t-chimera:free',
  'qwen/qwen3-coder:free',
  'microsoft/phi-3-mini-128k-instruct:free',
];

export async function generateConfigAction(answers: string) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: 'API key not configured',
      message: 'Система AI временно недоступна. (API Key missing)',
    };
  }

  let lastError = null;

  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://service-industry.ru',
          'X-Title': 'PC Configurator',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: 'system',
              content:
                'Ты - профессиональный сборщик ПК. Отвечай на русском языке. Используй Markdown.',
            },
            {
              role: 'user',
              content: `Предложи оптимальную конфигурацию компьютера на основе следующих ответов клиента:\n${answers}\n\nФормат ответа:\n1. Краткое резюме.\n2. Список комплектующих (CPU, GPU, MB, RAM, SSD, PSU, Case, Cooler).\n3. Бюджет.\n4. Комментарий.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        lastError = `API Error (${model}): ${response.status}`;
        continue;
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        lastError = `Invalid format (${model})`;
        continue;
      }

      const text = data.choices[0].message.content;

      return {
        success: true,
        message: text,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Unknown error';
      continue;
    }
  }

  return {
    success: false,
    error: 'All models failed',
    message:
      lastError || 'Не удалось сгенерировать конфигурацию. Сервис перегружен, попробуйте позже.',
  };
}
