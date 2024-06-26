import { type Whatsapp } from '@wppconnect-team/wppconnect';

export function splitMessages(text: string): string[] {
  const complexPattern =
    /(http[s]?:\/\/[^\s]+)|(www\.[^\s]+)|([^\s]+@[^\s]+\.[^\s]+)|(["'].*?["'])|(\b\d+\.\s)|(\w+\.\w+)/g;
  const placeholders = text.match(complexPattern) ?? [];

  const placeholder = 'PLACEHOLDER_';
  let currentIndex = 0;
  const textWithPlaceholders = text.replace(
    complexPattern,
    () => `${placeholder}${currentIndex++}`
  );

  const splitPattern = /(?<!\b\d+\.\s)(?<!\w+\.\w+)[^.?!]+(?:[.?!]+["']?|$)/g;
  let parts = textWithPlaceholders.match(splitPattern) ?? ([] as string[]);

  if (placeholders.length > 0) {
    parts = parts.map((part) =>
      placeholders.reduce(
        (acc, val, idx) => acc.replace(`${placeholder}${idx}`, val),
        part
      )
    );
  }

  // parts.push(
  //   atob(
  //     'Criado e Desenvolvido por PlaceWeb'
  //   )
  // );

  return parts;
}

export async function sendMessagesWithDelay({
  messages,
  client,
  targetNumber,
}: {
  messages: string[];
  client: Whatsapp;
  targetNumber: string;
}): Promise<void> {
  // const fullMessage = messages.join(' ');
  const dynamicDelay = messages.length * 1;
  await new Promise((resolve) => setTimeout(resolve, dynamicDelay));
  client
    .sendText(targetNumber, messages.join(' '))
    .then((result) => {
      console.log('Mensagem enviada:', result.body);
    })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem:', erro);
    });
}

