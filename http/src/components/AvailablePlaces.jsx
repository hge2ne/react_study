import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false); //초기값 false 설정. useEffect 함수 내에선 True 로 설정
  const [error, setError] = useState(); //error : 에러메세지 화면에 띄우는 역할

  useEffect(() => {
    setIsFetching(true); // true인 이유? places를 가져오기 시작하기 때문
    async function fetchPlaces() {
      try {
        //유틸함수로 빼둔 코드를 await 사용 + 상수 선언해서 navigator 안에서 사용
        const places = await fetchAvailablePlaces(); // => http 요청을 보내는 실질적인 코드

        navigator.geolocation.getCurrentPosition((position) => {
          //위 코드에 async,await 사용 불가(getCurrentPositiondms promise를 반환하지 않음)
          const sortedPlaces = sortPlacesByDistance(
            places, // resData.places 대신 사용
            //resData.places,
            position.coords.latitude, //위도
            position.coords.longitude //경도
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
          //장소분류가 완료되거나, 에러가 있을 때 isFetching을 false로 설정하는 코드
        });
        /**
         * navigator 객체 : 브라우저 내장 객체임. 브라우저 유저의 위치 fetch 가능
         */
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
        setIsFetching(false);
      }
      //이 위치에서 setIsFetching(false) 못함. 위 navigator 콜백함수에서 async/await 사용못하기 때문
      //=> 콜백함수 안에서 state 업데이트 해야함
    }

    fetchPlaces(); //함수 생성하고 반드시 호출해야 작동함
    // json(): JSON 형식 데이터 추출하는 메서드
    //response는 promise를 반환하므로 return 붙이면 .then 메서드 사용 가능
    //then() 사용 목적 : response 데이터를 돌려받고 그 데이터로 작업하기 위함
  }, []);

  if (error) {
    return <Error title="An eroor occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces} //위에서 useEffect 작업 후 여기서 사용 가능
      isLoading={isFetching} //places 를 기다리는 동안 true 전달 데이터 받으면 false로 전환
      loadingText="Fetching place data..." //대체 텍스트
      fallbackText="No places available." //저장된 장소가 없을 때 띄우는 대체 텍스트(fallback)
      onSelectPlace={onSelectPlace}
    />
  );
}
