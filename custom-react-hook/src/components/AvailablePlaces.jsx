import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.jsx";

/**
 * @fetchSortedPlaces : 이 함수 안의 Promise 코드가 장소 정렬 기능 수행하므로, useFetch 훅은 수정 필요x
- js에서 Promise 가 아닌 함수와 API를 Promise 기반 함수로 변경하기 위해 사용되는 패턴
 *  */
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces); //sortedPlaces : fetchSortedPlaces 함수로 promise에 의해 return 되는 값
    }); // 프로미스 안에 navigator 코드 넣음 -> 프로미스를 변경
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces, // fetchedData -> availablePlaces 이름 변경
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
