import { parse } from 'date-fns';
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import HeadBase from '../components/HeadBase';

import Layout from '../components/Layout';

import { SubTask, Task, TaskGroup, TaskStatus } from '../features/task/models';
import {
  TaskProgressGraphCountSource,
  TaskProgressSection,
} from '../features/task/TaskProgressSection';
import { assertNever } from '../utility/type';

function extractTaskGroupName(rawName: string) {
  const items = rawName.split('-');
  if (items.length === 1) {
    return rawName;
  }

  const [versionString, otherString] = items;
  const otherItems = otherString.split(':');
  if (otherItems.length === 1) {
    return versionString;
  }

  const versionTitle = otherItems[0];
  return `${versionString}: ${versionTitle}`;
}

function sortTaskGroupName(l: string, r: string) {
  const vl = l.split(':')[0];
  const [lMajor, lMinor, lPatch] = vl.split('.').map((s) => Number.parseInt(s, 10));
  const lVer = lMajor * 10000 + lMinor * 100 + lPatch;
  const vr = r.split(':')[0];
  const [rMajor, rMinor, rPatch] = vr.split('.').map((s) => Number.parseInt(s, 10));
  const rVer = rMajor * 10000 + rMinor * 100 + rPatch;

  if (lVer === rVer) {
    return 0;
  }

  return lVer < rVer ? -1 : 1;
}

const DevelopmentStatusPage: React.FC<PageProps<Queries.DevelopmentStatusPageQueryQuery>> = ({
  data,
}) => {
  const toolTaskGroups = data.allTasksJson.nodes.at(0)?.taskGroups;
  const taskGroups =
    toolTaskGroups
      ?.map((g) => {
        if (g == null || g.name == null || g.tasks == null) {
          return undefined;
        }

        function parseCompleted(completed: boolean) {
          return completed ? TaskStatus.Done : TaskStatus.Todo;
        }

        function parseDueOn(dueOnStr: string | null) {
          return dueOnStr == null ? undefined : parse(dueOnStr, 'yyyy-MM-dd', new Date());
        }

        const tasks: Task[] = [];
        g.tasks.forEach((t) => {
          if (t == null || t.name == null || t.completed == null || t.subTasks == null) {
            return;
          }

          const subTasks: SubTask[] = [];
          t.subTasks.forEach((s) => {
            if (s == null || s.name == null || s.completed == null) {
              return;
            }

            subTasks.push({
              name: s.name,
              status: parseCompleted(s.completed),
              dueOn: parseDueOn(s.dueOn),
            });
          });

          tasks.push(new Task(t.name, parseCompleted(t.completed), parseDueOn(t.dueOn), subTasks));
        });

        return new TaskGroup(extractTaskGroupName(g.name), tasks);
      })
      .filter((g): g is TaskGroup => g != null) ?? [];

  const sortedTaskGroups = taskGroups.sort((l, r) => sortTaskGroupName(l.name, r.name));

  const allGroup = new TaskGroup('All');
  sortedTaskGroups.forEach((g) => {
    allGroup.add(...g.tasks);
  });

  function getPhaseClassNameByStatus(status: TaskStatus) {
    switch (status) {
      case TaskStatus.Done:
        return 'step-primary';
      case TaskStatus.InProgress:
        return 'step-accent';
      case TaskStatus.Todo:
        return '';
      default:
        return assertNever(status);
    }
  }

  return (
    <Layout>
      <TaskProgressSection
        name='全体状況'
        taskGroup={allGroup}
        dueOn={allGroup.finalDueOn}
        graphCountSource={TaskProgressGraphCountSource.TaskRecuesiveCount}
        displayTaskList={false}
      >
        <ul className='steps steps-vertical'>
          {sortedTaskGroups.map((g) => (
            <li className={`step ${getPhaseClassNameByStatus(g.status)}`}>{g.name}</li>
          ))}
        </ul>
      </TaskProgressSection>

      <h1 className='text-4xl'>残作業詳細</h1>
      {sortedTaskGroups.map((g) => (
        <TaskProgressSection
          name={g.name}
          taskGroup={g}
          dueOn={g.finalDueOn}
          graphCountSource={TaskProgressGraphCountSource.TaskRecuesiveCount}
        />
      ))}
    </Layout>
  );
};

export default DevelopmentStatusPage;

export const Head = () => <HeadBase pageTitle='開発状況' pageDescription='開発の状況' />;

export const query = graphql`
  query DevelopmentStatusPageQuery {
    allTasksJson {
      nodes {
        taskGroups {
          tasks {
            subTasks {
              name
              dueOn
              completed
            }
            name
            dueOn
            completed
          }
          name
        }
      }
    }
  }
`;
