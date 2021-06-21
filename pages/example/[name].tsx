import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
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

// This also gets called at build time
export const getStaticProps: GetStaticProps<{ name: string }> = async (
  context,
) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { params } = context;
  const { name } = params as IParams;

  //   const res = await fetch(`http://localhost:3000/example/${id}`);
  //   const post = await res.json();

  // Pass post data to the page via props
  return { props: { name } };
};

// This function gets called at build time
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
  return { paths, fallback: false };
};

export default Before;
