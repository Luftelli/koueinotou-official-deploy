/* eslint-disable no-console */
import axios, { Axios } from 'axios';
import * as fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const JSON_DESTINATION = 'contents/tasks/asana_tasks.json';

type GetSectionResponseSection = {
  gid: string;
  name: string;
};

type GetSectionResponse = {
  data: readonly GetSectionResponseSection[];
};

type GetSectionTaskResponseTask = {
  gid: string;
  completed: boolean;
  due_on: Date | undefined;
  name: string;
  num_subtasks: number;
};

type GetSectionTaskResponse = {
  data: readonly GetSectionTaskResponseTask[];
};

type GetTaskSubTaskResponseSubTask = {
  gid: string;
  completed: boolean;
  due_on: Date | undefined;
  name: string;
};

type GetTaskSubTaskResponse = {
  data: readonly GetTaskSubTaskResponseSubTask[];
};

type SubTask = {
  name: string;
  dueOn: Date | undefined;
  completed: boolean;
};

type Task = {
  name: string;
  dueOn: Date | undefined;
  subTasks: readonly SubTask[];
  completed: boolean;
};

type TaskGroup = {
  name: string;
  tasks: readonly Task[];
};

function isTargetSection(section: GetSectionResponseSection) {
  return section.name.startsWith('v');
}

async function getSection(client: Axios, projectId: string) {
  const sectionResponse = await client.get<GetSectionResponse>(
    `projects/${projectId}/sections?opt_fields=gid,name`,
  );
  console.info(`${sectionResponse.data.data.length} section data are obtained.`);

  const targetSections = sectionResponse.data.data.filter(isTargetSection);
  console.info(`${targetSections.length} target sections are found.`);

  return targetSections;
}

async function getTasksBySection(
  client: Axios,
  section: GetSectionResponseSection,
): Promise<readonly Task[]> {
  const taskResponse = await client.get<GetSectionTaskResponse>(
    `sections/${section.gid}/tasks?opt_fields=gid,name,completed,due_on,num_subtasks`,
  );
  console.info(
    `${taskResponse.data.data.length} tasks are obtained in the section "${section.name}".`,
  );

  const tasks: Task[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const task of taskResponse.data.data) {
    let subTasks: readonly SubTask[] = [];
    if (task.num_subtasks > 0) {
      // eslint-disable-next-line no-await-in-loop
      const subTaskResponse = await client.get<GetTaskSubTaskResponse>(
        `tasks/${task.gid}/subtasks?opt_fields=gid,name,completed,due_on`,
      );
      console.info(
        `${subTaskResponse.data.data.length} sub tasks are obtained in the task "${task.name}".`,
      );

      subTasks = subTaskResponse.data.data.map((d) => ({
        name: d.name,
        dueOn: d.due_on,
        completed: d.completed,
      }));
    } else {
      console.info(`The task "${task.name}" doesn't have sub tasks.`);
    }

    tasks.push({
      name: task.name,
      dueOn: task.due_on,
      completed: task.completed,
      subTasks,
    });
  }

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
  if (typeof process.env.ASANA_API_TOKEN !== 'string') {
    throw Error('The environment variable "ASANA_API_TOKEN" is not set.');
  }

  if (typeof process.env.ASANA_PROJECT_ID !== 'string') {
    throw Error('The environment variable "ASANA_PROJECT_ID" is not set.');
  }

  const apiToken = process.env.ASANA_API_TOKEN;
  const projectId = process.env.ASANA_PROJECT_ID;

  const blackWordList =
    typeof process.env.BLACK_WORD_LIST === 'string' ? process.env.BLACK_WORD_LIST.split(',') : [];

  const startTime = performance.now();

  const client = axios.create({
    baseURL: 'https://app.asana.com/api/1.0/',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${apiToken}`,
    },
  });

  const targetSections = await getSection(client, projectId);

  const taskGroups: TaskGroup[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const section of targetSections) {
    // eslint-disable-next-line no-await-in-loop
    const tasks = await getTasksBySection(client, section);
    taskGroups.push({
      name: section.name,
      tasks,
    });
  }

  saveTaskGroups(taskGroups, JSON_DESTINATION, blackWordList);
  const endTime = performance.now();
  console.log(`Process is finished in ${endTime - startTime}ms`);
}

main().catch((e) => console.error(e));
