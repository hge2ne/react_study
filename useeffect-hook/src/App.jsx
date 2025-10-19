import { useEffect, useRef, useState } from "react";
import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";
/*
  - storedPlaces : localStorage에서 가져온 id 배열 기반 place 객체 배열 제공
  - 위 useEffect 코드 : app() 실행후 1회만 실행됨
  - 1회만 실행되는 코드는 굳이 useEffect 문법 사용할 필요없음
  => 즉각 사용가능한 storedPlaces 를 사용해서 선택한 장소 상태 초기화에 사용
  - 함수 밖에 배치하는 이유? storedPlaces를 상태 초기값으로 사용하기 위해 + 1회 실행되는 코드이기 때문
  */

function App() {
  const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
  const [modalIsOpen, setModalIsOpen] = useState(false); //모달이 열려있는지 여부 제어하는 state생성
  const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place) => place.id == id)
  );

  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaves] = useState(storedPlaces); //여기 초기값으로 사용

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
    setModalIsOpen(true); // 저장된 장소를 삭제할지 물어보는 모달창이 열려있을때 Open() 호출하던 곳 => true 처리
  }

  function handleSelectPlace(id) {
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false); //모달 닫힌 상태 false 처리
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
    setModalIsOpen(false);
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)) //id 일치하지않는 경우 삭제 항목 아님
    );
  }

  return (
    <>
      <Modal open={ModalIsOpen}>
        {modalIsOpen && (
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
        )}
        {/* 
        조건부 렌더링(모달 열린 상태가 True일 때만 렌더링 됨)
        */}
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
