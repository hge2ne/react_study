import { calculateInvestmentResults, formatter } from '../util/investment.js';




export default function Results({ input }) {
  const results = []; // 오류 원인(함수 밖에 위치하면 안됨). 디버깅 해보기
/* 오류 원인 : 해당 리스트 내부에서 key 속성을 가진 요소들을 출력하고 있기 때문
=> 리스트가 입력값이 수정됨에 따라 삭제되고 대체되는 것이 아니라 계속 추가됨  */
  calculateInvestmentResults(input, results);

  if(results.length === 0) {
    return <p className='center'>Invalid input data provided.</p>
  }

  const initialInvestment =
    results[0].valueEndOfYear - // 에러 원인(년도가 정의되지 않음)
    /* 에러 내용: undefined 라는 값에서 이 속성을 읽는 데 실패함
     */
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
