import Places from './Places.jsx';
import {useState, useEffect} from 'react'


export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isFetching, setIsFetching] = useState(false) //초기값 false 설정. useEffect 함수 내에선 True 로 설정

  useEffect(()=> {
    setIsFetching(true) // true인 이유? places를 가져오기 시작하기 때문
    async function fetchPlaces(){
      //async 추가(개발자가 정의한 함수이기 때문에 리액트가 사용하려면 추가해야함)
      const response = await fetch('http://localhost:3000/places')
      const resData = await response.json()
      setAvailablePlaces(false)
    }

    fetchPlaces() //함수 생성하고 반드시 호출해야 작동함
  // json(): JSON 형식 데이터 추출하는 메서드
  //response는 promise를 반환하므로 return 붙이면 .then 메서드 사용 가능
  //then() 사용 목적 : response 데이터를 돌려받고 그 데이터로 작업하기 위함
 
  },[])

  
  return (
    <Places
      title="Available Places"
      places={availablePlaces} //위에서 useEffect 작업 후 여기서 사용 가능
      isLoading={true} //places 를 기다리는 동안 true 전달 데이터 받으면 false로 전환 
      loadingText="Fetching place data..." //대체 텍스트
      fallbackText="No places available." //저장된 장소가 없을 때 띄우는 대체 텍스트(fallback)
      onSelectPlace={onSelectPlace}
    />
  );
}
