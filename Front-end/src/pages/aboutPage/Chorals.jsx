import React from 'react'
import { ChoralDisplay,AboutBanner } from '../../components'
import image from '../../assets/images/Fraternite.jpg'

export const Chorals = () => {
  return (
    <div>
      <AboutBanner
      titleKey="ourChorals"
      descriptionKey="choralsDesc"
      backgroundImage={image} />
         <ChoralDisplay/>
    </div>
  )
}
