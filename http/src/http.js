export async function fetchAvailablePlaces() {
  //async 추가(개발자가 정의한 함수이기 때문에 리액트가 사용하려면 추가해야함)
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  /* 
react 에서 에러 다루기 => UI 업데이트(에러 메세지 띄움) 하는 것
http 요청 에러 해결방법 : try/catch 문 사용(async/await 에만 사용 가능)
try : 실패할 수 있는 코드를 {} 로 감쌈
catch : error를 props 로 넣고 에러 발생했을 때 실행할 코드는 {}에 정의
*/
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resData.places;
}
export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT", //method 라는 속성을 정의
    body: JSON.stringify({ places: places }), // places 배열을 JSON 형식으로 변환
    //(주의) 백엔드는 places key를 가진 객체만 요청받고 응답해줌 {}로 감싸주고 key 추가
    // keydhk 값을 가진 변수가 같은 이름이므로 {places} 로 생략 가능
    headers: {
      "Content-Type": "application/json",
    }, //요청에 첨부될 추가 메타데이터
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }
  return resData.message; //message 속성 붙는 이유? 백엔드 API 보면 message 속성을 응답으로 받고 있기 때문
}

/**
 *@fetchAvailablePlaces : 유틸함수(요청을 보내기 위해 호출하거나, 에러나 places를 돌려받기 위해 호출 )
 */
