import React from 'react';
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetStaticPropsType,
  InferGetServerSidePropsType,
} from 'next';

function Serverside({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  return (
    <div>
      <h1>Serverside</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await fetch('http://localhost:3000/api/after');
  // const data = await res.json();
  let data;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Serverside;
