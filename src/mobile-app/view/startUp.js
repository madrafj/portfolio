import React from 'react'
import { Spacer, Watermark } from './components'

const StartUp = props=> {

  return (
    <div className={props.isHidden ? 'hidden' : 'view loadr'}>
      <Spacer />
      <div>
        <h2>Absense Cam</h2>
        <h3>version 1.0.0</h3>
      </div>
      <Watermark boxClass="f" />
      <Spacer />
      <div className="fc">
				<div className="spinner" onAnimationEnd={props.onHide}>
					<div></div>
				</div>
			</div>
      <Spacer />
      <h4 className="f">L o a d i n g</h4>
      <Spacer />
    </div>
  )
}

export default StartUp