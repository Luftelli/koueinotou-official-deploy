/* eslint-disable max-classes-per-file */
import { max } from 'date-fns';
import { assertNever } from '../../utility/type';

export const TaskStatus = {
  Todo: 'ToDo',
  InProgress: 'InProgress',
  Done: 'Done',
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

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

export type SubTask = Readonly<{
  name: string;
  status: TaskStatus;
  dueOn: Date | undefined;
}>;

export class Task {
  get name() {
    return this._name;
  }

  get subTasks() {
    return this._subTasks;
  }

  get subTasksFinalDueOn() {
    return this._subTasksFinalDueOn;
  }

  get selfDueOn() {
    return this._selfDueOn;
  }

  get dueOn() {
    return max([this._subTasksFinalDueOn, this._selfDueOn]);
  }

  get subTasksStatus() {
    return this._subTasksStatus;
  }

  get selfStatus() {
    return this._selfStatus;
  }

  get status() {
    if (this._selfStatus === TaskStatus.Done) {
      return TaskStatus.Done;
    }

    if (this._selfStatus === TaskStatus.InProgress) {
      return TaskStatus.InProgress;
    }

    return this._subTasksStatus;
  }

  get subTaskCount() {
    return this._counts.Done + this._counts.InProgress + this._counts.ToDo;
  }

  constructor(name: string, status: TaskStatus, dueOn: Date, newTasks?: Task[]) {
    this._name = name;
    this._subTasks = newTasks ?? [];
    this._selfStatus = status;
    this._selfDueOn = dueOn;
    this._addCountAndFinalDueOn(this._subTasks);
    this._updateStatus();
  }

  getSubTaskCountByStatus(status: TaskStatus) {
    return this._counts[status];
  }

  add(...newTasks: readonly Task[]) {
    this._subTasks.push(...newTasks);
    this._addCountAndFinalDueOn(newTasks);
    this._updateStatus();
  }

  private _name: string;

  private _subTasks: Task[];

  private _subTasksFinalDueOn: Date = new Date();

  private _selfDueOn: Date = new Date();

  private _subTasksStatus: TaskStatus = TaskStatus.Todo;

  private _selfStatus: TaskStatus = TaskStatus.Todo;

  private _counts: { [t in TaskStatus]: number } = {
    [TaskStatus.Done]: 0,
    [TaskStatus.InProgress]: 0,
    [TaskStatus.Todo]: 0,
  };

  private _updateStatus() {
    if (this._counts[TaskStatus.Done] + this._counts[TaskStatus.InProgress] === 0) {
      this._subTasksStatus = TaskStatus.Todo;
    } else if (this._counts[TaskStatus.InProgress] + this._counts[TaskStatus.Todo] === 0) {
      this._subTasksStatus = TaskStatus.Done;
    } else {
      this._subTasksStatus = TaskStatus.InProgress;
    }
  }

  private _addCountAndFinalDueOn(newTasks: readonly Task[]) {
    newTasks.forEach((t) => {
      if (t.dueOn != null) {
        this._subTasksFinalDueOn = max([this._subTasksFinalDueOn, t.dueOn]);
      }
      this._counts[t.status] += 1;
    });
  }
}

// export type Task = Readonly<{
//   name: string;
//   status: TaskStatus;
//   weight: number;
//   dueOn: Date | undefined;
// }>;

export class TaskGroup {
  get name() {
    return this._name;
  }

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

  get totalWeight() {
    return this._weight.Done + this._weight.InProgress + this._weight.ToDo;
  }

  constructor(name: string, newTasks?: Task[]) {
    this._name = name;
    this._tasks = newTasks ?? [];
    this._addCountAndFinalDueOn(this._tasks);
    this._updateStatus();
  }

  getCountByStatus(status: TaskStatus) {
    return this._counts[status];
  }

  getWeightByStatus(status: TaskStatus) {
    return this._weight[status];
  }

  add(...newTasks: readonly Task[]) {
    this._tasks.push(...newTasks);
    this._addCountAndFinalDueOn(newTasks);
    this._updateStatus();
  }

  private _name: string;

  private _tasks: Task[];

  private _finalDueOn: Date = new Date();

  private _status: TaskStatus = TaskStatus.Todo;

  private _counts: { [t in TaskStatus]: number } = {
    [TaskStatus.Done]: 0,
    [TaskStatus.InProgress]: 0,
    [TaskStatus.Todo]: 0,
  };

  private _weight: { [t in TaskStatus]: number } = {
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
      this._weight[t.status] += t.weight;
    });
  }
}
