import React, { useLayoutEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
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

  // 完了済みセクションは、表示を要求されるまで重いcanvasを生成しない
  if (hidden) {
    return null;
  }

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
    <Section className='my-2 flex-grow-0 gap-y-1'>
      {title && <h2 className='text-3xl'>{title}</h2>}
      <p className='text-xl'>{statusText}</p>
      <Box className='h-full' collapsed={collapsed}>
        <div className='grid w-full min-w-0 grid-cols-1 items-center justify-center gap-8 xl:grid-cols-2 xl:gap-12'>
          {/* Chart.jsが親要素の寸法からcanvasを計算できるよう、専用の正方形コンテナを使用 */}
          <div
            className='relative mx-auto w-full min-w-0 max-w-[28rem] overflow-hidden'
            style={{ height: 'min(28rem, calc(100vw - 5.25rem))' }}
          >
            <Doughnut
              aria-label={`${taskGroup.name}の進捗状況`}
              role='img'
              data={{
                labels,
                datasets: [
                  {
                    backgroundColor: colors,
                    borderColor: 'rgb(200, 200, 200)',
                    data,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
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
              }}
            />
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
              {progressDisplay}
            </div>
          </div>
          <div className='h-[28rem] min-w-0 overflow-hidden'>
            {displayTaskList && (
              <div className='flex h-full min-h-0 flex-col justify-start gap-2'>
                <p className='text-2xl'>タスク一覧</p>
                <div className='min-h-0 flex-1 overflow-y-auto'>
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
