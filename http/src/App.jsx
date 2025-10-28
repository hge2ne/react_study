import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  //userPlaces : 장소를 선택할때마다 업데이트되는 장소 배열
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(); //처음엔 빈배열이었다가 장소에 문제가 생겼을 때만 업데이트 됨
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }
  /**
   *
   * @handleSelectPlace : async/ await 추가함으로써 이벤트리스너 함수로 만들어줌(유저가 장소선택할때 실행됨)
   */
  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      //에러 catch 방법 : (실패시 실행할 코드) userPlaces를 이전 상태로 재설정
      setUserPlaces(userPlaces); // 변동 사항을 복구하고 새로 선택한 장소는 반영되지 않은 장소를 가져옴
      setErrorUpdatingPlaces({
        message: error.message || "Failed to updated places.",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  /**
   * @handleError : 에러 모달창 닫을 수 있도록 기능
   */
  function handleError() {
    setErrorUpdatingPlaces(null); //null 로 설정 : 에러를 없앨수 있도록 함
  }
  return (
    <>
      {/* 
    1번째 모달 : 에러메세지 기능
    */}
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {/* 
        (주의) 이하 Error 컴포넌트 : errorUpdatingPlaces가 True일때만 렌더링 되어야함 
        => && 연산자 사용(조건부 렌더링)
        - Modal 컴포넌트는 브라우저 DOM에 포함된 요소임(항상 모달창 열리는 것x 항상 브라우저 내 존재함)
        */}
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message} // message 라는 속성으로 state에 접근 시도
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
