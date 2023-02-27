import React from 'react';

import Layout from '../components/Layout';

import { TaskGroup, TaskStatus } from '../features/task/models';
import {
  TaskProgressSectionProps,
  TaskProgressSection,
} from '../features/task/TaskProgressSection';
import { assertNever } from '../utility/type';

const items = [
  {
    title: '2017/5',
    cardTitle: 'プロトタイプ作成',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2019/',
    cardTitle: '基本システム作成',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2022前半',
    cardTitle: 'β版作成',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
  {
    title: '2022後半',
    cardTitle: 'リリース版作成',
    cardSubtitle: 'Men of the British Expeditionary Force (BEF) wade out to..',
    cardDetailedText: 'Men of the British Expeditionary Force (BEF) wade out to..',
    media: {
      type: 'IMAGE',
      source: {
        url: 'http://someurl/image.jpg',
      },
    },
  },
] as const;

const progresses: TaskProgressSectionProps[] = [
  {
    name: 'v0.21.0',
    taskGroup: new TaskGroup([
      {
        name: 'デジゲー博2022を踏まえた修正',
        status: TaskStatus.Done,
        dueOn: undefined,
      },
      {
        name: 'ゲームUIのさらなる改善',
        status: TaskStatus.Done,
        dueOn: undefined,
      },
      {
        name: '救済武器追加',
        status: TaskStatus.InProgress,
        dueOn: undefined,
      },
      {
        name: '空中戦ステージ追加',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: 'ステージ改善',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '武器追加',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '武器改善',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: 'オセロステージ修正',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: 'プレイヤーデザイン改善',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: 'バージョン・ライセンス表示を追加',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: 'パフォーマンス最適化',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ1',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ2',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ3',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ4',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ5',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '限定公開テストプレイ6',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
    ]),
    dueOn: new Date(2011, 10, 20),
  },
  {
    name: 'v0.20.0',
    taskGroup: new TaskGroup([
      {
        name: 'デジゲー博2022を踏まえた修正',
        status: TaskStatus.Done,
        dueOn: undefined,
      },
      {
        name: 'ゲームUIのさらなる改善',
        status: TaskStatus.Done,
        dueOn: undefined,
      },
    ]),
    dueOn: new Date(2010, 10, 20),
  },
  {
    name: 'v0.22.0',
    taskGroup: new TaskGroup([
      {
        name: '？？？',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
      {
        name: '！！！！',
        status: TaskStatus.Todo,
        dueOn: undefined,
      },
    ]),
    dueOn: undefined,
  },
];

const DevelopmentStatusPage = () => {
  const sortedProgresses = progresses.sort((l, r) => {
    if (l.name === r.name) {
      return 0;
    }

    return l.name < r.name ? -1 : 1;
  });

  const allGroup = new TaskGroup();
  progresses.forEach((p) => {
    allGroup.add(...p.taskGroup.tasks);
  });

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

  return (
    <Layout pageTitle='開発状況' pageDescription='開発の状況'>
      <TaskProgressSection
        name='全体状況'
        taskGroup={allGroup}
        dueOn={allGroup.finalDueOn}
        displayTaskList={false}
      >
        <ul className='steps steps-vertical'>
          {sortedProgresses.map((p) => (
            <li className={`step ${getPhaseClassNameByStatus(p.taskGroup.status)}`}>{p.name}</li>
          ))}
        </ul>
      </TaskProgressSection>

      <h1 className='text-4xl'>残作業詳細</h1>
      {sortedProgresses.map((p) => (
        <TaskProgressSection name={p.name} taskGroup={p.taskGroup} dueOn={p.dueOn} />
      ))}
    </Layout>
  );
};

export default DevelopmentStatusPage;
