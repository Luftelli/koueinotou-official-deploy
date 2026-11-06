/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import { AsanaTask, createAsanaApiClientFromEnvVars } from './asana_api_client';

dotenv.config();

type AsanaGetTagTaskResponse = {
  data: readonly AsanaTask[];
};

async function main() {
  if (typeof process.env.ASANA_PROJECT_ID !== 'string') {
    throw Error('The environment variable "ASANA_PROJECT_ID" is not set.');
  }

  //   const projectId = process.env.ASANA_PROJECT_ID;

  const startTime = performance.now();
  const client = createAsanaApiClientFromEnvVars();

  // v0.4.0-dev2019.5 セクション
  const sectionId = '1204111357887840';
  // v0.4.0-dev2019.5 タグ
  const tagId = '1120283723507051';

  const tasks = await client.get<AsanaGetTagTaskResponse>(`tags/${tagId}/tasks`);
  const promises = tasks.data.map(async (t) => {
    console.info(`Add the task "${t.name}" to the section (${sectionId})`);
    await client.post(`sections/${sectionId}/addTask`, { task: t.gid });
  });
  await Promise.all(promises);

  const endTime = performance.now();
  console.log(`API call count is ${client.callCount}.`);
  console.log(`Process is finished in ${endTime - startTime}ms`);
}

main().catch((e) => console.error(e));
