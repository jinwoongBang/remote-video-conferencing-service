import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import { SeminarResponse, Data } from '../api/before';

function After({ result }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div>
        <h1>After</h1>
        <h2>{result.map((item) => item.name)}</h2>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/example/before1">
              <a>before1</a>
            </Link>
          </li>
          <li>
            <Link href="/example/before2">
              <a>before2</a>
            </Link>
          </li>
          <li>
            <Link href="/example/before3">
              <a>before3</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ result: Data[] }> = async ({
  params,
}) => {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/after');
  console.log(params);
  const { result }: SeminarResponse<Data> = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      result,
    },
  };
};

export default After;
