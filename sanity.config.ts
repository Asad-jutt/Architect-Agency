import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const projectId = process.env.SANITY_PROJECT_ID || 'demo_architect';
const dataset = process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'architect-exe',
  title: 'ARCHITECT.EXE Studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
