import { useState } from 'react';
import styles from '../styles/form.module.scss'
import {RenderData} from './RenderData'


export const RoiForm = () => {


  const [state, setState] = useState({
    shares: 0,
    entry: 0,
    target: 0,
    stop: 0,
    formType: 0
  })


  const onFormSubmit = (e) => {
    e.preventDefault();
    //calculate my dam results



  }

  const onInputChange = (e) => {
    let input = e.target.name;
    let val = e.target.value;

    let newState = {...state}
    newState[input] = val;
    setState(newState);
  }



  return (
    <form className={styles.stonkForm}onSubmit={onFormSubmit}>
      <label >
        Shares:&nbsp;&nbsp;
        <input onChange={onInputChange} step="5" value={state.shares} name="shares" type="number" />
      </label>

      <label >
        Entry:&nbsp;&nbsp;
        <input onChange={onInputChange} step="0.01" value={state.entry} name="entry" type="number" />
      </label>
      <label >
        Stop Loss:&nbsp;&nbsp;
        <input onChange={onInputChange} step="0.01" value={state.stop} name="stop" type="number" />
      </label>

      <label >
        Target:&nbsp;&nbsp;
        <input onChange={onInputChange} step="0.01" value={state.target} name="target" type="number" />
      </label>



      {/* <input type="submit" name="submit" /> */}
      {RenderData(state)}
    </form>
  )
}


