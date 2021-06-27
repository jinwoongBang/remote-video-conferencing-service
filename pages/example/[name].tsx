import React from 'react';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetServerSideProps,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SeminarResponse, Data } from '../api/before';

interface IParams extends ParsedUrlQuery {
  name: string;
}

function Before({ name }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Before</h1>
      <h2>{name}</h2>
    </div>
  );
}

// [1] 실행 순서
/**
 * @description 빌드 할 때 사용할 페이지를 생성 후 런타임 시 생성된 페이지를 불러옴
 *  정의하지 않은 하위 경로는 접근해도 화면이 안 뜸.
 * @returns
 */
export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/before');
  const response: SeminarResponse<Data> = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = response.result.map((item: Data) => ({
    params: { name: item.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// [2] 실행 순서
export const getStaticProps: GetStaticProps<{ name: string }> = async (
  context,
) => {
  const { params } = context;
  const { name } = params as IParams;

  const res = await fetch('http://localhost:3000/api/after');
  const response = await res.json();

  console.log({ after: response });

  // Pass post data to the page via props
  return { props: { name }, revalidate: 3 };
};

export default Before;
