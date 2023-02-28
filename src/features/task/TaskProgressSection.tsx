import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { format } from 'date-fns';

import Section from '../../components/Section';

import Box from '../../components/Box';
import { getTaskStatusColor, TaskGroup, TaskStatus } from './models';
import { TaskStatusIcon } from './TaskIcon';
import { assertNever } from '../../utility/type';

ChartJS.register(ArcElement, Title, Tooltip, Legend, ChartDataLabels);

export type TaskProgressSectionProps = {
  name: string;
  taskGroup: TaskGroup;
  dueOn: Date | undefined;
  displayTaskList?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
};

export const TaskProgressSection: React.FC<TaskProgressSectionProps> = ({
  children,
  name,
  taskGroup,
  dueOn,
  displayTaskList = true,
  collapsed = false,
}) => {
  const doneCount = taskGroup.getCountByStatus(TaskStatus.Done);
  const inProgressCount = taskGroup.getCountByStatus(TaskStatus.InProgress);
  const toDoCount = taskGroup.getCountByStatus(TaskStatus.Todo);
  const percentage = Math.round((doneCount / taskGroup.totalCount) * 100);
  let statusText;
  let progressDisplay: JSX.Element;
  const dueOnText = dueOn == null ? undefined : format(dueOn, 'y年M月d日');
  switch (taskGroup.status) {
    case TaskStatus.Done:
      {
        const suffix = dueOnText == null ? '' : `${dueOnText}`;
        statusText = `: ${suffix}完了`;
        progressDisplay = <p className='text-2xl font-bold'>完了</p>;
      }
      break;
    case TaskStatus.InProgress:
      {
        const suffix = dueOnText == null ? '' : `（${dueOnText}完了予定）`;
        statusText = `: 進行中${suffix}`;
        progressDisplay = (
          <p className='text-2xl font-bold'>
            進捗
            <br />
            {percentage}%
          </p>
        );
      }
      break;
    case TaskStatus.Todo:
      {
        const suffix = dueOnText == null ? '' : `（${dueOnText}完了予定）`;
        statusText = `: 未着手${suffix}`;
        progressDisplay = <p className='text-2xl font-bold'>未着手</p>;
      }
      break;
    default:
      return assertNever(taskGroup.status);
  }

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
    <Section className='gap-y-1 flex-grow-0 my-2'>
      <h2 className='text-3xl'>
        {name}
        {statusText}
      </h2>
      <Box className='h-full' collapsed={collapsed}>
        <div className='grid w-full gap-12 grid-cols-1 lg:grid-cols-2 justify-center'>
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
          <div className='h-min mx-auto my-auto'>
            {displayTaskList && (
              <table className='text-base text-left'>
                <tbody>
                  {taskGroup.tasks.map((t) => (
                    <tr key={t.name}>
                      <td>
                        <TaskStatusIcon status={t.status} />
                      </td>
                      <td>{t.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {children}
          </div>
        </div>
      </Box>
    </Section>
  );
};
