import { parse } from 'date-fns';
import { graphql, PageProps } from 'gatsby';
import React, { useLayoutEffect, useRef } from 'react';
import HeadBase from '../components/HeadBase';

import Layout from '../components/Layout';

import { SubTask, Task, TaskGroup, TaskStatus } from '../features/task/models';
import {
  TaskProgressGraphCountSource,
  TaskProgressSection,
} from '../features/task/TaskProgressSection';
import { assertNever } from '../utility/type';

function getSectionName(taskGroup: TaskGroup) {
  return taskGroup.title == null
    ? taskGroup.versionString
    : `${taskGroup.versionString} ${taskGroup.title}`;
}

const DevelopmentStatusPage: React.FC<PageProps<Queries.DevelopmentStatusPageQueryQuery>> = ({
  data,
}) => {
  const currentProgressingPhaseRef = useRef<HTMLLIElement>(null);
  useLayoutEffect(() => {
    currentProgressingPhaseRef.current?.scrollIntoView();
  }, []);

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

        return new TaskGroup(g.name, tasks);
      })
      .filter((g): g is TaskGroup => g != null) ?? [];

  const sortedTaskGroups = taskGroups.sort((l, r) => TaskGroup.sort(l, r));

  const allGroup = new TaskGroup('All');
  sortedTaskGroups.forEach((g) => {
    allGroup.add(...g.tasks);
  });

  function getPhaseDataContentByStatus(status: TaskStatus) {
    switch (status) {
      case TaskStatus.Done:
        return '✓';
      case TaskStatus.InProgress:
        return '▶';
      case TaskStatus.Todo:
        return 'ー';
      default:
        return assertNever(status);
    }
  }

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

  // 最初の完了状態でないグループが出たらそれをアクティブグループとし、それより後のグループは未着手状態とする
  let isActiveGroupAppeard = false;
  const stepElements = sortedTaskGroups.map((g) => {
    const displayName = g.title == null ? g.versionString : `${g.versionString}: ${g.title}`;
    if (isActiveGroupAppeard) {
      return (
        <li
          data-content={getPhaseDataContentByStatus(TaskStatus.Todo)}
          className={`step ${getPhaseClassNameByStatus(TaskStatus.Todo)}`}
        >
          {displayName}
        </li>
      );
    }

    const isCurrentGroupActive = g.status !== TaskStatus.Done;
    isActiveGroupAppeard = isCurrentGroupActive;

    if (isActiveGroupAppeard) {
      return (
        <li
          ref={currentProgressingPhaseRef}
          data-content={getPhaseDataContentByStatus(TaskStatus.InProgress)}
          className={`step ${getPhaseClassNameByStatus(TaskStatus.InProgress)}`}
        >
          {displayName}
        </li>
      );
    }

    return (
      <li
        data-content={getPhaseDataContentByStatus(g.status)}
        className={`step ${getPhaseClassNameByStatus(g.status)}`}
      >
        {displayName}
      </li>
    );
  });

  return (
    <Layout>
      <TaskProgressSection
        name='全体状況'
        taskGroup={allGroup}
        dueOn={allGroup.finalDueOn}
        graphCountSource={TaskProgressGraphCountSource.TaskRecursiveCount}
        displayTaskList={false}
      >
        <div className='h-auto mx-auto my-auto'>
          <ul className='steps steps-vertical overflow-auto'>{stepElements}</ul>
        </div>
      </TaskProgressSection>

      <h1 className='text-4xl'>残作業詳細</h1>
      {sortedTaskGroups.map((g) => (
        <TaskProgressSection
          name={getSectionName(g)}
          taskGroup={g}
          dueOn={g.finalDueOn}
          graphCountSource={TaskProgressGraphCountSource.TaskRecursiveCount}
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
