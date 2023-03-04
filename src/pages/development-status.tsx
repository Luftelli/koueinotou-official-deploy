import { parse } from 'date-fns';
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import HeadBase from '../components/HeadBase';

import Layout from '../components/Layout';

import { Task, TaskGroup, TaskStatus } from '../features/task/models';
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

        const tasks: Task[] = [];
        g.tasks.forEach((t) => {
          if (t == null || t.name == null || t.completed == null) {
            return;
          }

          if (t.subTasks == null || t.subTasks.length === 0) {
            tasks.push({
              name: t.name,
              status: t.completed ? TaskStatus.Done : TaskStatus.Todo,
              dueOn: t.dueOn == null ? undefined : parse(t.dueOn, 'yyyy-MM-dd', new Date()),
              weight: 1,
            });
            return;
          }

          const actualCompleteCount = t.subTasks.reduce(
            (r, s) => r + (s?.completed ?? true ? 1 : 0),
            0,
          );
          const [status, completeCount] = (() => {
            // 親タスクが終わっていたら子タスクも完了とみなす
            if (t.completed) {
              return [TaskStatus.Done, t.subTasks.length];
            }

            if (actualCompleteCount === t.subTasks.length) {
              return [TaskStatus.Done, actualCompleteCount];
            }

            if (actualCompleteCount === 0) {
              return [TaskStatus.Todo, actualCompleteCount];
            }

            return [TaskStatus.InProgress, actualCompleteCount];
          })();

          tasks.push({
            name: `${t.name} (${completeCount}/${t.subTasks.length})`,
            status,
            dueOn: t.dueOn == null ? undefined : parse(t.dueOn, 'yyyy-MM-dd', new Date()),
            weight: t.subTasks.length,
          });

          // t.subTasks.forEach((st) => {
          //   if (st == null || st.name == null || st.completed == null) {
          //     return;
          //   }

          //   // サブタスクに期限がない場合は親の期限参照
          //   const subDueOn = st.dueOn ?? t.dueOn;
          //   // サブタスクが終わってなくても親が終わってたら終わっているとみなす
          //   const subCompleted = t.completed || st.completed;
          //   tasks.push({
          //     name: `${t.name}/${st.name}`,
          //     status: subCompleted ? TaskStatus.Done : TaskStatus.Todo,
          //     dueOn:
          //       subDueOn ?? subDueOn == null
          //         ? undefined
          //         : parse(subDueOn, 'yyyy-MM-dd', new Date()),
          //     weight: 1,
          //   });
          // });
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
        graphCountSource={TaskProgressGraphCountSource.TaskWeight}
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
          graphCountSource={TaskProgressGraphCountSource.TaskWeight}
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
