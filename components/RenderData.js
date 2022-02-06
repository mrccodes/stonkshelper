
import styles from '../styles/data.module.scss'
export const RenderData = (data) => {



    const prettyPercent = (num) => {
      return (`${Math.round(num * 100) / 100}%`)
    }

  if (data.formType === 0) {
    const { shares, entry, stop, target } = data;

    //roi form
    let totalInvestment = shares * entry;
    let maxLoss = totalInvestment - (shares * stop) ;
    let maxProfit = (shares * target) - totalInvestment;
    let roi = ((((shares * target) - totalInvestment ) / (shares * entry)) * 100);
    let prettyRoi =  prettyPercent(roi)
    let reward = Math.round(((shares * target) - (shares * entry) ));
    let risk = Math.round( ((shares * entry) - (shares * stop) ))

    let riskReward = reduce(
      reward ,
      risk
    )

    return (
      <div className={styles.data}>
        <div>
          <p>Total Investement:</p>
          <p>{totalInvestment}</p>
        </div>
        <div>
          <p>Max Loss: </p>
          <p>${maxLoss}</p>
        </div>
        <div>
          <p>Max Profit: </p>
          <p>${maxProfit}</p>
        </div>
        <div>
          <p>R/R: </p>
          <p>{riskReward[1]}/{riskReward[0]}</p>
        </div>
        <div>
          <p>Potential ROI: </p>
          <p> {prettyRoi}</p>
        </div>








      </div>
    )

  } else if (data.formType === 1) {
    const { shares, entry, riskOption, determineBy, maxLoss, roi } = data;
    let totalInvestment = shares * entry;
    var stop;
    var target;


    if (determineBy === 'roi') {
      let expectedProfit = totalInvestment * (roi / 100);
      stop = (totalInvestment - (expectedProfit / Number(riskOption.slice(-1))) ) / shares;

      target = (expectedProfit + totalInvestment) / shares;



    } else if (determineBy === 'max' ) {
      target = (totalInvestment + (maxLoss * Number(riskOption.slice(-1)))) / shares;
      stop = (totalInvestment - maxLoss) / shares;
    }
    let reward = Math.round(((shares * target) - (shares * entry) ));
    let risk = Math.round( ((shares * entry) - (shares * stop) ))


    let riskReward = reduce(
      reward ,
      risk
    )


    let calculatedRoi = ((((shares * target) - totalInvestment ) / (shares * entry)) * 100);
    let prettyRoi =  prettyPercent(calculatedRoi)
    let potentialProfit = (target * shares) - totalInvestment;


    //exit form
    return (
     <div className={styles.data}>
       <div>
         <p>Total Investement: </p>
         <p>{totalInvestment.toString()}</p>
       </div>
       <div>
         <p> Stop Loss: </p>
         <p>${stop.toString()}</p>
       </div>
       <div>
         <p>Target:</p>
         <p>{target.toString()}</p>
       </div>
       <div>
         <p> R/R: </p>
         <p>{riskReward[1].toString()}/{riskReward[0].toString()}</p>
       </div>
       <div>
         <p> ROI: </p>
         <p>{prettyRoi.toString()}</p>
       </div>
      <div>
        <p>Potential Profit: </p>
        <p>{potentialProfit.toString()}</p>
      </div>
     </div>
    )
  }

}

const reduce = (numerator,denominator) => {
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}
