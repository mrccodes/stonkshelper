import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { RoiForm } from '../components/RoiForm.js'
import { ExitForm } from '../components/ExitForm.js'
import { useState } from 'react'

export default function Home() {
  const [formSelect, setFormSelect] = useState(0)

  const renderForm = () => {
    if (formSelect === 0) return <RoiForm />
    else if (formSelect === 1) return <ExitForm />

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>git ya stonks</title>
        <meta name="description" content="an app to be my brain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.btnHolder}>
        <button className={formSelect === 1 ? styles.selectedBtn : styles.defaultBtn}  onClick={() => {setFormSelect(1)}}> Find Stop and Target</button>
        <button className={formSelect === 0 ? styles.selectedBtn : styles.defaultBtn} onClick={() => {setFormSelect(0)}}> Get R/R and ROI</button>

      </div>
      {renderForm()}



    </div>
  )
}
