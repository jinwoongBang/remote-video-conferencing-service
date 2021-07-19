import React from 'react';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPaths,
  GetServerSideProps,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import HttpClient from 'src/common/framework/HttpClient';
import { AxiosResponse } from 'axios';
import OTAResponse from 'src/common/framework/OTAResponse';
import { Data } from 'src/pages/api/before';

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
  // const res = await HttpClient.get('before');
  // const response: SeminarResponse<Data> = await res.data;

  // Get the paths we want to pre-render based on posts
  // const paths = response.result.map((item: Data) => ({
  //   params: { name: item.name },
  // }));

  const paths = [
    { params: { name: 'before1' } },
    { params: { name: 'before2' } },
  ];

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

// [2] 실행 순서
/**
 * @description
 *  You should not fetch an API route from getStaticProps..."
 *  여기서 API 호출해서는 안됨
 *  getStaticProps 와 getStaticPaths 는 서버 쪽에서 실행되는 로직이기 때문에
 *  쿼리를 짜도되고, node 네이티브 코드 사용 가능
 *  브라우저 관련 로직을 짜서는 안됨.
 * @link {https://nextjs.org/docs/basic-features/data-fetching#write-server-side-code-directly}
 * @param context
 * @returns
 */
export const getStaticProps: GetStaticProps<{ name: string }> = async (
  context,
) => {
  const { params } = context;
  const { name } = params as IParams;

  /**
   * TODO: API 요청을 하면 안됨, 쿼리를 직접 짜야 함.
   *  자세한 내용은 위 @description 을 참고
   */

  // Pass post data to the page via props
  return { props: { name }, revalidate: 3 };
};

export default Before;
