export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText}) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {/* 
      위 코드 : isLoading prop이 True 일때의 대체텍스트
      */}
      {!isLoading && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                {/* 
                백틱기호로 감싼 src 속성 : 백엔드에 img 파일 요청 보냄(GET 요청, fetching 이라고도 함)
                */}
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
