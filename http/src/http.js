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
    throw new ErrorPage("Failed to fetch places");
  }
  return resData.places;
}

/**
 *@fetchAvailablePlaces : 유틸함수(요청을 보내기 위해 호출하거나, 에러나 places를 돌려받기 위해 호출 )
 */
