import * as React from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Button from '../components/Button';
import HeadBase from '../components/HeadBase';

const NotFoundPage = () => (
  <Layout>
    <h1 className='text-4xl'>ページが見つかりません</h1>

    <Section className='gap-y-4'>
      <p>お探しのページが見つかりませんでした……</p>
      <Button link='/'>トップページに戻る</Button>
    </Section>
  </Layout>
);

export default NotFoundPage;

export const Head = () => (
  <HeadBase pageTitle='ページが見つかりません' pageDescription='ページが見つかりません' />
);
