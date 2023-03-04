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
  constructor(name: string, status: TaskStatus, dueOn: Date | undefined, newTasks?: SubTask[]) {
    this._name = name;
    this._subTasks = newTasks ?? [];
    this._selfStatus = status;
    this._selfDueOn = dueOn;
    this._addCountAndFinalDueOn(this._subTasks);
    this._updateStatus();
  }

  /**
   * 特定状態のタスク数
   *
   * 以下の値が返される。
   * - サブタスクがある場合：特定状態のサブタスク数
   * - サブタスクがなくタスク自身の状態と一致した場合：1
   * - サブタスクがなくタスク自身の状態と一致しない場合：0
   * ただし、タスク自身の状態によってサブタスクの状態は以下のように上書きされる。
   * - タスク自身が完了の場合：全てのサブタスクが完了となる
   * @param status 対象の状態
   * @returns タスク数
   */
  getCountByStatus(status: TaskStatus) {
    // サブタスクがなかったら自分自身のカウントを返す
    if (this._subTasks.length === 0) {
      return this._selfStatus === status ? 1 : 0;
    }

    return this._counts[status];
  }

  /**
   * サブタスクを追加する
   * @param newTasks サブタスクリスト
   */
  add(...newTasks: readonly SubTask[]) {
    this._subTasks.push(...newTasks);
    this._addCountAndFinalDueOn(newTasks);
    this._updateStatus();
  }

  /**
   * タスク名
   */
  get name() {
    return this._name;
  }

  /**
   * 進捗情報を含んだタスク名
   *
   * サブタスクがない場合はタスク名と同一となり、サブタスクがある場合は全サブタスク数と完了したサブタスク数を含んだ名前となる。
   */
  get nameWithProgress() {
    return this._subTasks.length === 0
      ? this._name
      : `${this._name} (${this.getCountByStatus(TaskStatus.Done)}/${this._subTasks.length})`;
  }

  /**
   * サブタスクリスト
   */
  get subTasks() {
    return this._subTasks;
  }

  /**
   * タスク自身の期限
   */
  get selfDueOn() {
    return this._selfDueOn;
  }

  /**
   * 期限
   *
   * タスク自身と全サブタスクで最も遅い期限が返される。
   */
  get dueOn() {
    if (this._subTasksFinalDueOn == null) {
      return this._selfDueOn;
    }

    if (this._selfDueOn == null) {
      return this._subTasksFinalDueOn;
    }

    return max([this._subTasksFinalDueOn, this._selfDueOn]);
  }

  /**
   * タスク自身の状態
   */
  get selfStatus() {
    return this._selfStatus;
  }

  /**
   * 状態
   *
   * 以下のように判定される。
   * - タスク自身が完了している場合：完了
   * - タスク自身が進行中の場合：進行中
   * - 上記以外の場合：サブタスクの状態
   */
  get status() {
    if (this._selfStatus === TaskStatus.Done) {
      return TaskStatus.Done;
    }

    if (this._selfStatus === TaskStatus.InProgress) {
      return TaskStatus.InProgress;
    }

    return this._subTasksStatus;
  }

  /**
   * タスク数
   *
   * 以下の値が返される。
   * - サブタスクがある場合：サブタスク数
   * - サブタスクがない場合：1
   */
  get count() {
    // サブタスクがなければ自分自身を1とカウントして返す
    return Math.max(this._subTasks.length, 1);
  }

  private _name: string;

  private _subTasks: SubTask[];

  private _subTasksFinalDueOn: Date | undefined;

  private _selfDueOn: Date | undefined;

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

  private _addCountAndFinalDueOn(newTasks: readonly SubTask[]) {
    newTasks.forEach((s) => {
      if (s.dueOn != null) {
        this._subTasksFinalDueOn =
          this._subTasksFinalDueOn == null ? s.dueOn : max([this._subTasksFinalDueOn, s.dueOn]);
      }
      let subTaskStatus = s.status;
      switch (this._selfStatus) {
        case TaskStatus.Done:
          // 親が完了していたら子も完了とする
          subTaskStatus = TaskStatus.Done;
          break;
        case TaskStatus.InProgress:
          break;
        case TaskStatus.Todo:
          break;
        default:
          assertNever(this._selfStatus);
      }
      this._counts[subTaskStatus] += 1;
    });
  }
}

export class TaskGroup {
  constructor(name: string, newTasks?: Task[]) {
    this._name = name;
    this._tasks = newTasks ?? [];
    this._addCountAndFinalDueOn(this._tasks);
    this._updateStatus();
  }

  /**
   * 特定状態のタスク数
   * @param status 状態
   * @returns タスク数
   */
  getCountByStatus(status: TaskStatus) {
    return this._counts[status];
  }

  /**
   * 特定状態の再帰的なタスク数
   * @param status 状態
   * @returns タスク数
   */
  getRecursiveCountByStatus(status: TaskStatus) {
    return this._tasks.reduce((c, t) => c + t.getCountByStatus(status), 0);
  }

  /**
   * タスクを追加する
   * @param newTasks タスクリスト
   */
  add(...newTasks: readonly Task[]) {
    this._tasks.push(...newTasks);
    this._addCountAndFinalDueOn(newTasks);
    this._updateStatus();
  }

  /**
   * タスクグループ名
   */
  get name() {
    return this._name;
  }

  /**
   * タスクリスト
   */
  get tasks() {
    return this._tasks;
  }

  /**
   * タスク内で最も遅い期限
   */
  get finalDueOn() {
    return this._finalDueOn;
  }

  /**
   * タスクの状態
   *
   * 状況は以下のように選択される。
   * - 進行中・完了のタスクが0の場合：未着手
   * - 進行中・未着手のタスクが0：完了
   * - 上記以外の場合：進行中
   */
  get status() {
    return this._status;
  }

  /**
   * タスク数
   */
  get count() {
    return this._counts.Done + this._counts.InProgress + this._counts.ToDo;
  }

  /**
   * 再帰的なタスク数
   */
  get recursiveCount() {
    return this._tasks.reduce((c, t) => c + t.count, 0);
  }

  private _name: string;

  private _tasks: Task[];

  private _finalDueOn: Date | undefined;

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
        this._finalDueOn = this._finalDueOn == null ? t.dueOn : max([this._finalDueOn, t.dueOn]);
      }
      this._counts[t.status] += 1;
    });
  }
}
