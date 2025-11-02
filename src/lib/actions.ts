'use server';

import {
  generateScreeningRecommendations,
  GenerateScreeningRecommendationsInput,
} from '@/ai/flows/generate-screening-recommendations';
import { revalidatePath } from 'next/cache';

export async function getRecommendations(
  input: GenerateScreeningRecommendationsInput
) {
  try {
    const result = await generateScreeningRecommendations(input);
    revalidatePath('/dashboard/screening');
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return { success: false, error: 'Failed to generate recommendations.' };
  }
}
