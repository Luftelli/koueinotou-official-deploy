/* eslint-disable max-classes-per-file */
import axios, { Axios } from 'axios';

export class Semaphore {
  constructor(limit = 1) {
    this._limit = limit;
  }

  async acquire() {
    this._count += 1;
    if (this._count > this._limit) {
      await new Promise<void>((resolve) => {
        this._resolveWaitList.push(resolve);
      });
    }
  }

  release() {
    this._count -= 1;
    if (this._count > 0) {
      this._resolveWaitList.shift()?.();
    } else {
      this._all?.();
    }
  }

  async all() {
    if (this._count > 0) {
      await new Promise<void>((resolve) => {
        this._all = resolve;
      });
    }
  }

  private _limit = 1;

  private _count = 0;

  private _resolveWaitList = new Array<() => void>();

  private _all: (() => void) | undefined;
}

export class AsanaApiClient {
  constructor(token: string, readConcurrentCallLimit: number, writeConcurrentCallLimit: number) {
    this._client = axios.create({
      baseURL: 'https://app.asana.com/api/1.0/',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    this._readSemaphore = new Semaphore(readConcurrentCallLimit);
    this._writeSemaphore = new Semaphore(writeConcurrentCallLimit);
  }

  async get<T>(url: string) {
    this._callCount += 1;
    await this._readSemaphore.acquire();
    const response = await this._client.get<T>(url);
    this._readSemaphore.release();
    return response.data;
  }

  async put<T>(url: string, data: Record<string, unknown>) {
    this._callCount += 1;
    await this._writeSemaphore.acquire();
    const response = await this._client.put<T>(url, { data });
    this._writeSemaphore.release();
    return response.data;
  }

  async post<T>(url: string, data: Record<string, unknown>) {
    this._callCount += 1;
    await this._writeSemaphore.acquire();
    const response = await this._client.post<T>(url, { data });
    this._writeSemaphore.release();
    return response.data;
  }

  get callCount() {
    return this._callCount;
  }

  private readonly _client: Axios;

  private readonly _readSemaphore: Semaphore;

  private readonly _writeSemaphore: Semaphore;

  private _callCount = 0;
}

export function createAsanaApiClientFromEnvVars() {
  if (typeof process.env.ASANA_API_TOKEN !== 'string') {
    throw Error('The environment variable "ASANA_API_TOKEN" is not set.');
  }

  if (typeof process.env.ASANA_API_READ_CONCURRENT_CALL_LIMIT !== 'string') {
    throw Error('The environment variable "ASANA_API_READ_CONCURRENT_CALL_LIMIT" is not set.');
  }

  if (typeof process.env.ASANA_API_WRITE_CONCURRENT_CALL_LIMIT !== 'string') {
    throw Error('The environment variable "ASANA_API_WRITE_CONCURRENT_CALL_LIMIT" is not set.');
  }

  const apiToken = process.env.ASANA_API_TOKEN;
  const concurrentReadCallLimit = Number.parseInt(
    process.env.ASANA_API_READ_CONCURRENT_CALL_LIMIT,
    10,
  );
  const concurrentWriteCallLimit = Number.parseInt(
    process.env.ASANA_API_WRITE_CONCURRENT_CALL_LIMIT,
    10,
  );

  return new AsanaApiClient(apiToken, concurrentReadCallLimit, concurrentWriteCallLimit);
}

export type AsanaSection = {
  gid: string;
  name: string;
};

export type AsanaTask = {
  gid: string;
  completed: boolean;
  due_on: string | undefined;
  completed_at: string | undefined;
  name: string;
  num_subtasks: number | undefined;
};
