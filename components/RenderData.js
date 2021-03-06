
import styles from '../styles/data.module.scss'
export const RenderData = (data) => {



    const prettyPercent = (num) => {
      return (`${Math.round(num * 100) / 100}%`)
    }
    const prettyDollars = (num) => {
      return (`$${Math.round(num * 100) / 100}`)
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
          <p>{prettyDollars(totalInvestment.toString())}</p>
        </div>
        <div>
          <p>R/R: </p>
          <p>{riskReward[1].toString()}/{riskReward[0].toString()}</p>
        </div>
        <div>
          <p>Potential Profit: </p>
          <p>{prettyDollars(maxProfit.toString())}</p>
        </div>
        <div>
          <p>Potential Loss: </p>
          <p>{prettyDollars(maxLoss.toString()) }</p>
        </div>


        <div>
          <p>Potential ROI: </p>
          <p> {prettyRoi.toString()}</p>
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
         <p>{prettyDollars(totalInvestment.toString())}</p>
       </div>
       <div>
         <p> Stop Loss: </p>
         <p>{prettyDollars(stop.toString())}</p>
       </div>
       <div>
         <p>Target:</p>
         <p>{prettyDollars(target.toString())}</p>
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
        <p>{prettyDollars(potentialProfit.toString())}</p>
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
