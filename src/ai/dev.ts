import { config } from 'dotenv';
config();

import '@/ai/flows/generate-screening-recommendations.ts';
import '@/ai/flows/generate-audio.ts';
import '@/ai/flows/generate-test-audio.ts';
