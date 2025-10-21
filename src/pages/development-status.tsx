import { parse } from 'date-fns';
import { graphql, PageProps } from 'gatsby';
import React, { useLayoutEffect, useRef, useState } from 'react';
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
  const [displayCompletedSteps, setDisplayCompletedSteps] = useState(false);
  const currentProgressingPhaseRef = useRef<HTMLLIElement>(null);
  useLayoutEffect(() => {
    currentProgressingPhaseRef.current?.scrollIntoView();
  }, []);

  const toolTaskGroups = data.allTasksJson.nodes.at(0)?.taskGroups;
  const taskGroups =
    toolTaskGroups
      ?.map((g) => {
        if (g?.name == null || g.tasks == null) {
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
          if (t?.name == null || t.completed == null || t.subTasks == null) {
            return;
          }

          const subTasks: SubTask[] = [];
          t.subTasks.forEach((s) => {
            if (s?.name == null || s.completed == null) {
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
        return 'step-success';
      case TaskStatus.InProgress:
        return 'step-info';
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
          key={displayName}
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
          key={displayName}
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
        key={displayName}
        data-content={getPhaseDataContentByStatus(g.status)}
        className={`step ${getPhaseClassNameByStatus(g.status)}`}
      >
        {displayName}
      </li>
    );
  });

  function onDisplayCompletedStepsToggleClicked() {
    setDisplayCompletedSteps(!displayCompletedSteps);
  }

  const completedTaskGroupCount = sortedTaskGroups.filter(
    (g) => g.status === TaskStatus.Done,
  ).length;

  return (
    <Layout>
      <h1 className='text-4xl'>全体状況</h1>
      <TaskProgressSection
        taskGroup={allGroup}
        dueOn={allGroup.finalDueOn}
        graphCountSource={TaskProgressGraphCountSource.TaskRecursiveCount}
        displayTaskList={false}
      >
        <div className='h-full flex flex-col gap-1'>
          <p className='text-2xl'>状況概要</p>
          <p className='text-l'>
            {sortedTaskGroups.length}ステップ中{completedTaskGroupCount}ステップ完了
          </p>
          <div className='h-full overflow-y-auto mx-auto my-auto'>
            <ul className='steps steps-vertical overflow-auto'>{stepElements}</ul>
          </div>
        </div>
      </TaskProgressSection>

      <h1 className='text-4xl' aria-label='1'>
        ステップ毎状況
      </h1>
      <div className='form-control'>
        <label
          className='label cursor-pointer justify-center gap-2'
          htmlFor='display-completed-steps'
        >
          <span className='label-text'>完了済みのステップを表示する</span>
          <input
            type='checkbox'
            className='toggle'
            checked={displayCompletedSteps}
            id='display-completed-steps'
            onChange={onDisplayCompletedStepsToggleClicked}
          />
        </label>
      </div>

      {sortedTaskGroups.map((g) => (
        <TaskProgressSection
          key={g.name}
          title={getSectionName(g)}
          taskGroup={g}
          dueOn={g.finalDueOn}
          graphCountSource={TaskProgressGraphCountSource.TaskRecursiveCount}
          hidden={!displayCompletedSteps && g.status === TaskStatus.Done}
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
