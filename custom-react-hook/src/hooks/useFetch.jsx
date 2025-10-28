import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn(); //fetchFn 실행시킴(useFetch()를 모든 fetchFn에서 사용 가능 )
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data." });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    //{} 사용하면 여러 값 반환 가능
    isFetching,
    fetchedData,
    error,
  };
}

/* 
- use 로 시작하는 함수 : hook을 의미함. 작명 규칙
(규칙 안지키면 작동하지 않음)
- 위 useEffect 코드를 커스텀 훅에 넣는 이유 : App.jsx에서 useEffect 코드 부분 지우고 커스텀 훅 호출해서 사용 가능
*/
