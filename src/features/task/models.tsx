import { max } from 'date-fns';
import { assertNever } from '../../utility/type';

export const TaskStatus = {
  Todo: 'ToDo',
  InProgress: 'InProgress',
  Done: 'Done',
} as const;
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export function getTaskStatusColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Done:
      return 'rgb(99, 255, 132)';
    case TaskStatus.InProgress:
      return 'rgb(99, 132, 255)';
    case TaskStatus.Todo:
      return 'rgb(255, 99, 132)';
    default:
      return assertNever(status);
  }
}
export type Task = Readonly<{
  name: string;
  status: TaskStatus;
  dueOn: Date | undefined;
}>;

export class TaskGroup {
  get tasks() {
    return this._tasks;
  }

  get finalDueOn() {
    return this._finalDueOn;
  }

  get status() {
    return this._status;
  }

  get totalCount() {
    return this._counts.Done + this._counts.InProgress + this._counts.ToDo;
  }

  constructor(newTasks?: Task[]) {
    this._tasks = newTasks ?? [];
    this._addCountAndFinalDueOn(this._tasks);
    this._updateStatus();
  }

  getCountByStatus(status: TaskStatus) {
    return this._counts[status];
  }

  add(...newTasks: readonly Task[]) {
    this._tasks.push(...newTasks);
    this._addCountAndFinalDueOn(newTasks);
    this._updateStatus();
  }

  private _tasks: Task[];

  private _finalDueOn: Date = new Date();

  private _status: TaskStatus = TaskStatus.Todo;

  private _counts: { [t in TaskStatus]: number } = {
    [TaskStatus.Done]: 0,
    [TaskStatus.InProgress]: 0,
    [TaskStatus.Todo]: 0,
  };

  private _updateStatus() {
    if (this._counts[TaskStatus.Done] + this._counts[TaskStatus.InProgress] === 0) {
      this._status = TaskStatus.Todo;
    } else if (this._counts[TaskStatus.InProgress] + this._counts[TaskStatus.Todo] === 0) {
      this._status = TaskStatus.Done;
    } else {
      this._status = TaskStatus.InProgress;
    }
  }

  private _addCountAndFinalDueOn(newTasks: readonly Task[]) {
    newTasks.forEach((t) => {
      if (t.dueOn != null) {
        this._finalDueOn = max([this._finalDueOn, t.dueOn]);
      }
      this._counts[t.status] += 1;
    });
  }
}
