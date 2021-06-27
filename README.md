## 버전 정보

- next.js : "11.0.0"
- react : "17.0.2",
- react-dom : "17.0.2"
- typescript : "4.3.4"

- recoil: "^0.3.1"

## 고민 내용
- 환경설정, 코드 값 들은 매 페이지마다 받아오는 것은 비효율 적인 것 같은데,
- 이런 데이터들은 상태 관리 라이브러리에 저장해 사용하는 것이 좋을 것 같다.
- 그런데 이런 데이터들을 useEffect 를 사용하여 저장하면 되긴하는데...
- 그러면 pre-fetch 의 의미가 없어지지 않을까...?

- 아니면 내가 잘못 이해하고 있는 것인지 잘 모르겠다

## 학습 내용
[1] getStaticProps (Static Generation): Fetch data at build time.
- props : An optional object with the props that will be received by the page component. It should be a serializable object

- revalidate : An optional amount in seconds after which a page re-generation can occur (defaults to: false or no revalidating). More on Incremental Static Regeneration

- notFound : An optional boolean value to allow the page to return a 404 status and page. Below is an example of how it works:

- 참고사항 : 여기서 리다이렉트(Redirect) 시킬 수도 있음.
```
return
    redirect: {
        destination: '/',
        permanent: false,
      },
```

[2] getStaticPaths (Static Generation): Specify dynamic routes to pre-render pages based on data.
- { fullback : false } 이면 미리 렌더링 해놓지 않은 페이지를 요청 할 경우 404 페이지로 이동('An error 404 occurred on server' 에러 페이지가 표시 됨)
- { fullback : true } 이면 getStaticProps 함수로 넘어 감. 이후 로직을 실행하여 정적 페이지를 생성하여 보여줌. isFullback() 함수를 통해 지금 정적 페이지를 생성 중인지 확인 할 수 있음.
- { fullback : blocking } 이면 true 설정과 비슷한데, 정적 페이지가 만들어지기 전까지 페이지 자체가 로드되지 않음.
- 언제 사용해야 할까?: 주소 변경에 의해 다수의 페이지가 필요하다면 { fullback : true } 를 사용하는 것이 좋음
- 장점 : pre-rendering page, 즉 빌드 시 미리 만들어 놓은 페이지를 사용하기 때문에 빠름
- 또한 생성해 놓지 않은 정적 페이지도 동적으로 생성하여 보여주기 때문에 빌드 시간이 줄어든다.
- 단점 : 생성되지 않은 정적 페이지는 첫번째 클라이언트 요청 시 시간이 다소 걸릴 수 있다.
- 필수 사항 : getStaticPaths 함수와 반드시 같이 사용해야 함.

[3] getServerSideProps (Server-side Rendering): Fetch data on each request.