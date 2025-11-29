'use server';

import {
  generateScreeningRecommendations,
  GenerateScreeningRecommendationsInput,
} from '@/ai/flows/generate-screening-recommendations';
import { generateAudio } from '@/ai/flows/generate-audio';
import { revalidatePath } from 'next/cache';

export async function getRecommendations(
  input: GenerateScreeningRecommendationsInput
) {
  try {
    const result = await generateScreeningRecommendations(input);
    revalidatePath('/dashboard/screening');
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: 'Failed to generate recommendations.' };
  }
}

export async function getAudio(text: string) {
  try {
    const result = await generateAudio(text);
    return { success: true, media: result.media };
  } catch (error) {
    return { success: false, error: 'Failed to generate audio.' };
  }
}
