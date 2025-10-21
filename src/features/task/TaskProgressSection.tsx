import React, { useLayoutEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  DoughnutController,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';

import Section from '../../components/Section';

import Box from '../../components/Box';
import { getTaskStatusColor, TaskGroup, TaskStatus } from './models';
import { TaskStatusIcon } from './TaskIcon';
import { assertNever } from '../../utility/type';

ChartJS.register(ArcElement, DoughnutController, Title, Tooltip, Legend, ChartDataLabels);

export const TaskProgressGraphCountSource = {
  TaskCount: 'TaskCount',
  TaskRecursiveCount: 'TaskRecursiveCount',
} as const;
export type TaskProgressGraphCountSource =
  (typeof TaskProgressGraphCountSource)[keyof typeof TaskProgressGraphCountSource];

export interface TaskProgressSectionProps {
  title?: string;
  taskGroup: TaskGroup;
  dueOn: Date | undefined;
  graphCountSource: TaskProgressGraphCountSource;
  displayTaskList?: boolean;
  collapsed?: boolean;
  hidden?: boolean;
  children?: React.ReactNode;
}

export const TaskProgressSection: React.FC<TaskProgressSectionProps> = ({
  children,
  title,
  taskGroup,
  dueOn,
  graphCountSource,
  displayTaskList = true,
  hidden = false,
  collapsed = false,
}) => {
  useLayoutEffect(() => {
    ChartJS.register(ArcElement, DoughnutController, Title, Tooltip, Legend, ChartDataLabels);
  }, []);

  function getCount(status: TaskStatus) {
    switch (graphCountSource) {
      case TaskProgressGraphCountSource.TaskCount:
        return taskGroup.getCountByStatus(status);
      case TaskProgressGraphCountSource.TaskRecursiveCount:
        return taskGroup.getRecursiveCountByStatus(status);
      default:
        return assertNever(graphCountSource);
    }
  }

  function getTotalCount() {
    switch (graphCountSource) {
      case TaskProgressGraphCountSource.TaskCount:
        return taskGroup.count;
      case TaskProgressGraphCountSource.TaskRecursiveCount:
        return taskGroup.recursiveCount;
      default:
        return assertNever(graphCountSource);
    }
  }

  const doneCount = getCount(TaskStatus.Done);
  const inProgressCount = getCount(TaskStatus.InProgress);
  const toDoCount = getCount(TaskStatus.Todo);
  const percentage = Math.round((doneCount / getTotalCount()) * 100);
  let progressDisplay: JSX.Element;
  let dueOnTextSuffix;
  let statusTextHead = '';

  switch (taskGroup.status) {
    case TaskStatus.Done:
      statusTextHead = '完了済み';
      dueOnTextSuffix = '完了';
      progressDisplay = <p className='text-2xl font-bold'>完了</p>;
      break;
    case TaskStatus.InProgress:
      statusTextHead = '進行中';
      dueOnTextSuffix = '完了予定';
      progressDisplay = (
        <p className='text-2xl font-bold'>
          進捗
          <br />
          {percentage}%
        </p>
      );
      break;
    case TaskStatus.Todo:
      statusTextHead = '未着手';
      dueOnTextSuffix = '完了予定';
      progressDisplay = <p className='text-2xl font-bold'>未着手</p>;
      break;
    default:
      return assertNever(taskGroup.status);
  }

  const dueOnText = dueOn == null ? undefined : format(dueOn, 'y年M月d日');
  const statusText = `${statusTextHead}: ${dueOnText}${dueOnTextSuffix}`;

  const labels = [];
  const colors = [];
  const data = [];
  if (doneCount > 0) {
    labels.push('完了');
    colors.push(getTaskStatusColor(TaskStatus.Done));
    data.push(doneCount);
  }
  if (inProgressCount > 0) {
    labels.push('進行中');
    colors.push(getTaskStatusColor(TaskStatus.InProgress));
    data.push(inProgressCount);
  }
  if (toDoCount > 0) {
    labels.push('未着手');
    colors.push(getTaskStatusColor(TaskStatus.Todo));
    data.push(toDoCount);
  }

  return (
    <Section className={`gap-y-1 flex-grow-0 my-2 ${hidden ? 'hidden' : ''}`}>
      {title && <h2 className='text-3xl'>{title}</h2>}
      <p className='text-xl'>{statusText}</p>
      <Box className='h-full' collapsed={collapsed}>
        {/* 2列表示時はレイアウトの崩れを防止するために高さを具体的に指定。右側と同じ高さにする。1列表示時はh-fullにしないと崩れるのでそうする */}
        <div className='grid w-full h-full lg:h-[28rem] gap-12 grid-cols-1 lg:grid-cols-2 justify-center'>
          <div className='relative flex justify-center items-center'>
            <Doughnut
              data={
                {
                  labels,
                  datasets: [
                    {
                      backgroundColor: colors,
                      borderColor: 'rgb(200, 200, 200)',
                      data,
                    },
                  ],
                } as ChartData<'doughnut'>
              }
              options={
                {
                  plugins: {
                    title: {
                      display: false,
                    },
                    // ラベルに項目名を表示するので判例は非表示
                    legend: {
                      display: false,
                    },
                    // マウスオーバー時に情報を表示しない
                    tooltip: { enabled: false },
                    datalabels: {
                      color: '#000',
                      textAlign: 'center',
                      font: {
                        weight: 'bold',
                      },
                      formatter: (value, ctx) => {
                        const { labels: ls } = ctx.chart.data;
                        const label = ls == null ? 'null' : ls[ctx.dataIndex];
                        return `${label}\n${value}項目`;
                      },
                    },
                  },
                } as ChartOptions<'doughnut'>
              }
            />
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
              {progressDisplay}
            </div>
          </div>
          {/* スクロールバーを表示するために絶対値指定 */}
          <div className='overflow-hidden max-h-[28rem]'>
            {displayTaskList && (
              <div className='h-full flex flex-col gap-2 justify-center'>
                <p className='text-2xl'>タスク一覧</p>
                <div className='h-auto overflow-y-auto flex'>
                  <table className='h-auto mx-auto text-base text-left'>
                    <tbody>
                      {taskGroup.tasks.map((t) => (
                        <tr key={t.nameWithProgress}>
                          <td>
                            <TaskStatusIcon status={t.status} />
                          </td>
                          <td>{t.nameWithProgress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </Box>
    </Section>
  );
};
