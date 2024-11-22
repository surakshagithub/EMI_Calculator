import { useEffect, useState } from "react";
import "./styles.css";
import { TenureData } from "./utils/constant";
import { numberWithCommas } from "./utils/config";
import { NumberInput } from "./components/NumberInput";
import { RangeInput } from "./components/RangeInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(0);
  const [downpayment, setDownpayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    if (!cost) return;
    // const EMIAmount = [P*R*(1+R)^N] / [(1+R)^N - 1]

    const loanAmount = cost - downpayment;
    const rateOfInterest = Number(interest) / 100;
    const noOfYears = tenure / 12;

    const emiAmount =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** noOfYears) /
      ((1 + rateOfInterest) ** noOfYears - 1);

    //divide by 12 to get monthly EMI
    return (Number(emiAmount) / 12).toFixed(0);
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return ((downPaymentPercent / 100) * cost).toFixed(0);
  };

  // update emi when user changes the down payment
  const updateEMI = (e) => {
    if (!cost) return;
    const dp = Number(e?.target?.value);
    setDownpayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  // update down payment when user changes the EMI
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e?.target?.value);
    setEmi(emi.toFixed(0));
    const dp = calculateDownPayment(emi);
    setDownpayment(dp);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownpayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downpayment);
    setEmi(emi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenure, cost]);

  return (
    <div className="App">
      <span className="title" style={{ fontSize: "30px", marginTop: 10 }}>
        EMI Calculator
      </span>
      <NumberInput
        state={cost}
        setState={setCost}
        title={"Total cost of Asset"}
      />
      <NumberInput
        state={interest}
        setState={setInterest}
        title={"Interest Rate(In %)"}
      />
      <NumberInput
        state={fee}
        setState={setFee}
        title={"Processing Fees (In %)"}
      />
      <RangeInput
        label={"Down Payment"}
        subLabel={`Total Down Payment - ${numberWithCommas(
          (Number(downpayment) + (cost - downpayment) * (fee / 100)).toFixed(0)
        )}`}
        min={0}
        max={cost}
        onChange={updateEMI}
        state={downpayment}
        labelMinValue={"0%"}
        labelMaxValue={"100%"}
      />
      <RangeInput
        label={"Loan Per Month"}
        subLabel={`Total Loan Amount- ${numberWithCommas(
          (emi * tenure || 0).toFixed(0)
        )}`}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        onChange={updateDownPayment}
        state={emi}
        labelMinValue={numberWithCommas(calculateEMI(cost))}
        labelMaxValue={numberWithCommas(calculateEMI(0)) || 0}
      />
      <span className="title">Tenure</span>
      <div className="tenure-container">
        {TenureData?.map((indvTenureData) => {
          return (
            <button
              className={`tenure ${
                indvTenureData === tenure ? "selected" : ""
              }`}
              onClick={() => setTenure(indvTenureData)}
            >
              {indvTenureData}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
