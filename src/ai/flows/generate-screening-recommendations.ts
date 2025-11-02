'use server';

/**
 * @fileOverview Generates personalized recommendations based on the infant's hearing screening status.
 *
 * - generateScreeningRecommendations - A function that generates personalized recommendations.
 * - GenerateScreeningRecommendationsInput - The input type for the generateScreeningRecommendations function.
 * - GenerateScreeningRecommendationsOutput - The return type for the generateScreeningRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScreeningRecommendationsInputSchema = z.object({
  screeningStatus: z
    .enum(['Passed', 'Referred', 'Not Yet Screened'])
    .describe('The infant hearing screening status.'),
  ageInMonths: z.number().describe('The infant age in months.'),
  riskFactors: z.array(z.string()).optional().describe('List of risk factors.'),
});
export type GenerateScreeningRecommendationsInput = z.infer<
  typeof GenerateScreeningRecommendationsInputSchema
>;

const GenerateScreeningRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('Personalized recommendations based on the screening status.'),
  reminderNeeded: z
    .boolean()
    .describe(
      'Whether a reminder is needed for follow-up screenings based on the screening status.'
    ),
});
export type GenerateScreeningRecommendationsOutput = z.infer<
  typeof GenerateScreeningRecommendationsOutputSchema
>;

export async function generateScreeningRecommendations(
  input: GenerateScreeningRecommendationsInput
): Promise<GenerateScreeningRecommendationsOutput> {
  return generateScreeningRecommendationsFlow(input);
}

const generateRecommendationsPrompt = ai.definePrompt({
  name: 'generateRecommendationsPrompt',
  input: {schema: GenerateScreeningRecommendationsInputSchema},
  output: {schema: GenerateScreeningRecommendationsOutputSchema},
  prompt: `You are a healthcare professional providing hearing screening recommendations for infants.
  Based on the infant's screening status, age in months, and risk factors, generate personalized recommendations for the parents or health workers.

  Screening Status: {{{screeningStatus}}}
  Age in Months: {{{ageInMonths}}}
  Risk Factors: {{#if riskFactors}}{{#each riskFactors}}- {{{this}}}
  {{/each}}{{else}}No risk factors listed.{{/if}}

  Generate personalized recommendations and decide if a reminder is needed for follow-up screenings.
  Set reminderNeeded to true if a follow-up is necessary, otherwise set it to false.
  `,
});

const generateScreeningRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateScreeningRecommendationsFlow',
    inputSchema: GenerateScreeningRecommendationsInputSchema,
    outputSchema: GenerateScreeningRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await generateRecommendationsPrompt(input);
    return output!;
  }
);
