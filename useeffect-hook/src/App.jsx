import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaves] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude, //위도
        position.coords.longitude //경도
      );
      setAvailablePlaves(sortedPlaces);
    });
  }, []);
  /*
위 useEffect 로 무한루프 해결되는 이유:
- 1번째 인수인 콜백함수가 실행되는 시점 중요함
- App() 실행되어도 위 코드는 즉시 실행되지 않음(App 컴포넌트 실행완료 후 실행됨 )
- (주의) 의존성배열 [] 때문에 위처럼 실행순서 정해지는 것임. [] 생략하면 App 컴포넌트 렌더링될때마다 Effect 함수 재실행됨

*/
  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
      //클릭한 장소 목록을 브라우저 저장소에 저장하는 기능
      const storedIds =
        JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      //if로 장소 중복 저장 방지
      /*
      코드 실행조건: handleSelectedPlace 함수 실행(사용자가 장소 클릭시 실행)
      위 코드는 상태 업데이트 하지않음 => 무한루프x
      (주의) useEffect 훅이 필요한 경우 : 무한루프 방지 해야하는 경우, 컴포넌트 최초 실행이후 작동가능한코드(시간꽤걸리는작업) 이 있는 경우
      */
      if (storedIds.indexOf(id))
        localStorage.setItem(
          "selectedPlaces",
          JSON.stringify([id, ...storedIds])
        );
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
