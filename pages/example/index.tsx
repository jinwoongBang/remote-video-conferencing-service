import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

type TestProps = { name: string };

function Test({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>test</h1>
      <h2>{data.name}</h2>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3000/api/hello');
  const data: TestProps = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default Test;
