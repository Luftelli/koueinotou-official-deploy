import React from 'react';
import { Chrono } from 'react-chrono';
import Layout from '../components/Layout';
import Section from '../components/Section';

import Button from '../components/Button';

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

const DevelopmentStatusPage = () => (
  <Layout pageTitle='開発状況' pageDescription='開発の状況'>
    <h1 className='text-4xl'>開発状況</h1>

    <Section>
      <Chrono
        items={[...items]}
        hideControls
        theme={{
          primary: '#2dd4bf',
          secondary: 'white',
          cardBgColor: '#374151',
          cardForeColor: 'white',
          titleColor: 'black',
        }}
      />
    </Section>

    <Section>
      <Button link='/development-history'>開発履歴</Button>
    </Section>
  </Layout>
);

export default DevelopmentStatusPage;
