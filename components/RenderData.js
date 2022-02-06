export const RenderData = (data) => {
  const { shares, entry, stop, target } = data;

  if (data.entry === 0 ||
      data.stop === 0 ||
      data.target === 0) {
        return null
      }


    const prettyPercent = (num) => {
      return (`${Math.round(num * 100) / 100}%`)
    }

  if (data.formType === 0) {
    //roi form
    let totalInvestment = shares * entry;
    let maxLoss = totalInvestment - (shares * stop) ;
    let maxProfit = (shares * target) - totalInvestment;
    let roi = ((((shares * target) - totalInvestment ) / (shares * entry)) * 100);
    let prettyRoi =  prettyPercent(roi)

    let riskReward = reduce(
      ((shares * target) - (shares * entry) ),
      ((shares * entry) - (shares * stop) )
    )
    return (
      <div>
        Total Investement: {totalInvestment}<br />
        Max Loss: ${maxLoss}<br />
        Max Profit: ${maxProfit}<br />
        R/R: {riskReward[1]}/{riskReward[0]} <br />
        Potential ROI: {prettyRoi} <br />



      </div>
    )

  } else if (data.formType === 1) {
    //exit form
    return null
  }

}

const reduce = (numerator,denominator) => {
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}
