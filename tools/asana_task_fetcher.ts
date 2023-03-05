/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
import * as fs from 'fs';
import dotenv from 'dotenv';
import {
  AsanaApiClient,
  AsanaSection,
  AsanaTask,
  createAsanaApiClientFromEnvVars,
} from './asana_api_client';

dotenv.config();

const JSON_DESTINATION = 'contents/tasks/asana_tasks.json';

type AsanaGetSectionResponse = {
  data: readonly AsanaSection[];
};

type AsanaGetSectionTaskResponse = {
  data: readonly AsanaTask[];
};

type AsanaGetTaskSubTaskResponse = {
  data: readonly AsanaTask[];
};

type SubTask = {
  name: string;
  dueOn: string | undefined;
  completed: boolean;
};

type Task = {
  name: string;
  dueOn: string | undefined;
  subTasks: readonly SubTask[];
  completed: boolean;
};

type TaskGroup = {
  name: string;
  tasks: readonly Task[];
};

function isTargetSection(section: AsanaSection) {
  return section.name.startsWith('v');
}

async function getSection(client: AsanaApiClient, projectId: string) {
  const sectionResponse = await client.get<AsanaGetSectionResponse>(
    `projects/${projectId}/sections?opt_fields=gid,name`,
  );
  console.info(`${sectionResponse.data.length} section data are obtained.`);

  const targetSections = sectionResponse.data.filter(isTargetSection);
  console.info(`${targetSections.length} target sections are found.`);

  return targetSections;
}

async function getTasksBySection(
  client: AsanaApiClient,
  section: AsanaSection,
): Promise<readonly Task[]> {
  const taskResponse = await client.get<AsanaGetSectionTaskResponse>(
    `sections/${section.gid}/tasks?opt_fields=gid,name,completed,due_on,num_subtasks,completed_at`,
  );
  console.info(`${taskResponse.data.length} tasks are obtained in the section "${section.name}".`);

  const promises = taskResponse.data.map(async (task) => {
    let subTasks: readonly SubTask[] = [];
    if (task.num_subtasks == null || task.num_subtasks > 0) {
      const subTaskResponse = await client.get<AsanaGetTaskSubTaskResponse>(
        `tasks/${task.gid}/subtasks?opt_fields=gid,name,completed,due_on,completed_at`,
      );
      console.info(
        `${subTaskResponse.data.length} sub tasks are obtained in the task "${task.name}".`,
      );

      subTasks = subTaskResponse.data.map((d) => ({
        name: d.name,
        // タスク期限が設定されていない場合はタスク完了日を期限とする。タスク完了日には時間も入っているので日付のみ抽出
        dueOn: d.due_on ?? d.completed_at?.split('T')[0],
        completed: d.completed,
      }));
    } else {
      console.info(`The task "${task.name}" doesn't have sub tasks.`);
    }

    return {
      name: task.name,
      // subTaskと同様
      dueOn: task.due_on ?? task.completed_at?.split('T')[0],
      completed: task.completed,
      subTasks,
    };
  });
  const tasks: readonly Task[] = await Promise.all(promises);

  return tasks;
}

function saveTaskGroups(
  taskGroups: readonly TaskGroup[],
  path: fs.PathLike,
  blackWordList: readonly string[],
) {
  let data = JSON.stringify(
    {
      taskGroups,
    },
    null,
    2,
  );

  blackWordList.forEach((w) => {
    // 小文字大文字を区別せず置換
    data = data.replace(new RegExp(w, 'gi'), 'XXXXX');
  });

  fs.writeFileSync(path, data);
  console.info(`The result is saved to "${path}".`);
}

async function main() {
  if (typeof process.env.ASANA_PROJECT_ID !== 'string') {
    throw Error('The environment variable "ASANA_PROJECT_ID" is not set.');
  }

  const projectId = process.env.ASANA_PROJECT_ID;
  const blackWordList =
    typeof process.env.BLACK_WORD_LIST === 'string' ? process.env.BLACK_WORD_LIST.split(',') : [];

  const startTime = performance.now();
  const client = createAsanaApiClientFromEnvVars();

  const targetSections = await getSection(client, projectId);

  const promises = targetSections.map(async (section) => {
    const tasks = await getTasksBySection(client, section);
    return {
      name: section.name,
      tasks,
    };
  });
  const taskGroups: readonly TaskGroup[] = await Promise.all(promises);

  saveTaskGroups(taskGroups, JSON_DESTINATION, blackWordList);

  const endTime = performance.now();
  console.log(`API call count is ${client.callCount}.`);
  console.log(`Process is finished in ${endTime - startTime}ms`);
}

main().catch((e) => console.error(e));
