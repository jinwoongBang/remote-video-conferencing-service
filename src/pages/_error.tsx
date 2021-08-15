import React from 'react';
import NextError from 'next/error';
interface ErrorProps {
  statusCode: number;
}

interface ErrorInitialProps {
  res: {
    statusCode: number;
  };
  err: ErrorProps;
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-error-page
 * @param {statusCode: number}
 * @description next js 자체에도 에러페이지를 만들어주는 컴포넌트가 있음.
 *  아래에 모듈과 소스 주석 처리 해놓았음
 * @returns
 */
function Error({ statusCode }: ErrorProps) {
  return (
    <NextError statusCode={statusCode} />
    // <p>
    //   {statusCode
    //     ? `An error ${statusCode} occurred on server`
    //     : 'An error occurred on client'}
    // </p>
  );
}

Error.getInitialProps = ({ res, err }: ErrorInitialProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

// import Error from 'next/error';

// export async function getServerSideProps() {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const errorCode = res.ok ? false : res.statusCode
//     const json = await res.json()

//     return {
//       props: { errorCode, stars: json.stargazers_count },
//     }
//   }

// export default function Page({ errorCode, stars }) {
//   if (errorCode) {
//     return <Error statusCode={errorCode} />;
//   }

//   return <div>Next stars: {stars}</div>;
// }

export default Error;
