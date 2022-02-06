import { useState } from 'react';
import { RenderData } from './RenderData'
import styles from '../styles/form.module.scss'
export const ExitForm = () => {
  const [state, setState] = useState({
    shares: 0,
    entry: 0,
    maxLoss: 0,
    roi: 0,
    formType: 1
  })


  const [settings, setSettings] = useState({
    riskOption: '1:1',
    determineBy: 'max'
  })


  const onFormSubmit = (e) => {
    e.preventDefault();
    //calculate my dam results
  }

  const renderLastInput = () => {
    if (settings.determineBy === 'max') {
      return (
        <label>
        Max Loss: &nbsp;$
        <input value={state.maxLoss} onChange={onInputChange} name="maxLoss" type="number" step="0.01"/>
      </label>
      )
    } else if (settings.determineBy === 'roi') {
      return (
        <label>
          Desired ROI:
          <input name="roi" value={state.roi}  onChange={onInputChange} type="number" step="0.01"/> %
        </label>
      )
    } else {
      return null
    }
  }

  const onInputChange = (e) => {
    let input = e.target.name;
    let val = e.target.value;

    let newState = {...state}
    newState[input] = val;
    setState(newState);
  }


  const onSelectChange = (e) => {
    let name = e.target.name;

    const oldSettings = {...settings}
    oldSettings[name] = e.target.value
    let oldState = {...state}

    if (name === 'determineBy') {
      oldState.maxLoss = 0;
      oldState.roi = 0;
    }
    setState(oldState)
    setSettings(oldSettings)
  }

  return (
    <form className={styles.stonkForm} onSubmit={onFormSubmit}>
  <label >
        Shares:&nbsp;&nbsp;
        <input onChange={onInputChange} step="5" value={state.shares} name="shares" type="number" />
      </label>

      <label >
        Entry:&nbsp;$
        <input onChange={onInputChange} step="0.01" value={state.entry} name="entry" type="number" />
      </label>
      <label >
        Desired R/R:&nbsp;&nbsp;
        <select value={settings.riskOption} name="riskOption" onChange={onSelectChange}>
            <option value="1:1">1:1</option>
            <option value="1:2">1:2</option>
            <option value="1:3">1:3</option>
          </select>
      </label>

      <label >
        Determine by:&nbsp;&nbsp;
        <select value={settings.determineBy} name="determineBy" onChange={onSelectChange}>
            <option value="max">Max Loss</option>
            <option value="roi">ROI</option>
          </select>
      </label>

     {renderLastInput()}



      {RenderData({
        ...state,
        ...settings
      })}
    </form>
  )
}