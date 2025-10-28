import { useEffect } from "react";

function useFetch() {
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);
}
/* 
- use 로 시작하는 함수 : hook을 의미함. 작명 규칙
(규칙 안지키면 작동하지 않음)
- 위 useEffect 코드를 커스텀 훅에 넣는 이유 : App.jsx에서 useEffect 코드 부분 지우고 커스텀 훅 호출해서 사용 가능
*/
