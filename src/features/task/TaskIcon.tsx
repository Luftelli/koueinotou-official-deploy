import React from 'react';
import { assertNever } from '../../utility/type';
import { getTaskStatusColor, TaskStatus } from './models';

interface TaskIconProps {
  className?: string;
}

export const TaskDoneIcon = ({ className = '' }: TaskIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    color={getTaskStatusColor(TaskStatus.Done)}
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={`w-6 h-6 ${className}`}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

export const TaskInProgressIcon = ({ className = '' }: TaskIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    color={getTaskStatusColor(TaskStatus.InProgress)}
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={`w-6 h-6 ${className}`}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
    />
  </svg>
);

export const TaskToDoIcon = ({ className = '' }: TaskIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    color={getTaskStatusColor(TaskStatus.Todo)}
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={`w-6 h-6 ${className}`}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

interface TaskStatusIconProps {
  status: TaskStatus;
  className?: string;
}

export const TaskStatusIcon = ({ status, className = '' }: TaskStatusIconProps) => {
  switch (status) {
    case TaskStatus.Done:
      return <TaskDoneIcon className={className} />;
    case TaskStatus.InProgress:
      return <TaskInProgressIcon className={className} />;
    case TaskStatus.Todo:
      return <TaskToDoIcon className={className} />;
    default:
      return assertNever(status);
  }
};
