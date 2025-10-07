import { calculateInvestmentResults, formatter } from '../util/investment.js';


export default function Results({ input }) {
  const results = [];
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
