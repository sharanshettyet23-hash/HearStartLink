'use server';
/**
 * @fileOverview A Text-to-Speech (TTS) flow that converts specific test sounds into audio.
 *
 * - generateTestAudio - A function that handles the audio generation for Ling-6 and environmental sounds.
 * - GenerateTestAudioInput - The input type for the generateTestAudio function.
 * - GenerateTestAudioOutput - The return type for the generateTestAudio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

const GenerateTestAudioInputSchema = z.string();
export type GenerateTestAudioInput = z.infer<
  typeof GenerateTestAudioInputSchema
>;

const GenerateTestAudioOutputSchema = z.object({
  media: z.string().describe('The base64 encoded audio data with a data URI.'),
});
export type GenerateTestAudioOutput = z.infer<
  typeof GenerateTestAudioOutputSchema
>;

export async function generateTestAudio(
  input: GenerateTestAudioInput
): Promise<GenerateTestAudioOutput> {
  return generateTestAudioFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateTestAudioFlow = ai.defineFlow(
  {
    name: 'generateTestAudioFlow',
    inputSchema: GenerateTestAudioInputSchema,
    outputSchema: GenerateTestAudioOutputSchema,
  },
  async (query) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Sound',
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Algenib' },
                },
              },
              {
                speaker: 'Phoneme',
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Achernar' },
                },
              },
            ],
          },
        },
      },
      prompt: query,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
