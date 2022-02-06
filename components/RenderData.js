import { getROI }  from './helpers'

export const RenderData = (data) => {
  const { shares, entry, stop, target } = data;

  if (data.entry === 0 ||
      data.stop === 0 ||
      data.target === 0) {
        return null
      }




  if (data.formType === 0) {
    //roi form
    let roi = ((((shares * target) - (shares * entry) ) / (shares * entry)) * 100);
    let prettyRoi = `${Math.round(roi * 100) / 100}%`

    let riskReward = reduce(
      ((shares * target) - (shares * entry) ),
      ((shares * entry) - (shares * stop) )
    )
    return (
      <div>
        ROI: {prettyRoi} <br />
        R/R: {riskReward[1]}/{riskReward[0]}
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
