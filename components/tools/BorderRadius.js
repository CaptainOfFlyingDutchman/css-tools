import React, { Component } from 'react';

export default class BorderRadius extends Component {
	constructor() {
		super();
		this.state = {
			enableYConfiguration: false,

			enableBorderTopLeftY: false,
			enableBorderTopRightY: false,
			enableBorderBottomRightY: false,
			enableBorderBottomLeftY: false,

			boxesState: {
				onlyOne: true,
				onlyTwo: false,
				onlyThree: false,
				allFour: false
			},

			borderTopLeftRadiusXValue: '50%',
			borderTopLeftRadiusYValue: '60%',

			borderTopRightRadiusXValue: '50%',
			borderTopRightRadiusYValue: '60%',

			borderBottomRightRadiusXValue: '50%',
			borderBottomRightRadiusYValue: '40%',

			borderBottomLeftRadiusXValue: '50%',
			borderBottomLeftRadiusYValue: '40%'

		};

		this.manageBoxesStateHandler = this.manageBoxesStateHandler.bind(this);
		this.toggleYCheckBoxHandler = this.toggleYCheckBoxHandler.bind(this);
		this.toggleYCheckBoxesHandler = this.toggleYCheckBoxesHandler.bind(this);

		this.topLeftBoxXValueHandler = this.topLeftBoxXValueHandler.bind(this);
		this.topLeftBoxYValueHandler = this.topLeftBoxYValueHandler.bind(this);

		this.topRightBoxXValueHandler = this.topRightBoxXValueHandler.bind(this);
		this.topRightBoxYValueHandler = this.topRightBoxYValueHandler.bind(this);

		this.bottomRightBoxXValueHandler = this.bottomRightBoxXValueHandler.bind(this);
		this.bottomRightBoxYValueHandler = this.bottomRightBoxYValueHandler.bind(this);

		this.bottomLeftBoxXValueHandler = this.bottomLeftBoxXValueHandler.bind(this);
		this.bottomLeftBoxYValueHandler = this.bottomLeftBoxYValueHandler.bind(this);

		this.updateTextBoxesValues = this.updateTextBoxesValues.bind(this);
		this.valueUpdater = this.valueUpdater.bind(this);
		this.toggleBoxesDisplay = this.toggleBoxesDisplay.bind(this);
	}

	componentDidMount() {
		this.map = {
			enableBorderTopLeftY : ['borderTopLeftRadiusYValue', this._borderTopLeftRadiusXBox],
			enableBorderTopRightY : ['borderTopRightRadiusYValue', this._borderTopRightRadiusXBox],
			enableBorderBottomRightY : ['borderBottomRightRadiusYValue', this._borderBottomRightRadiusXBox],
			enableBorderBottomLeftY : ['borderBottomLeftRadiusYValue', this._borderBottomLeftRadiusXBox]
		};
		this.toggleBoxesDisplay('onlyOne');
		this.toggleYCheckBoxHandler();
	}

	resetYBoxValue(yOption) {
		if (this.state[yOption]) { // box is unchecked
			const newValue = { [this.map[yOption][0]]: this.map[yOption][1].value };
			this.setState(newValue);
		}
	}

	toggleBoxesDisplay(rValue) {
		if (rValue === 'onlyOne') {
			this._borderTopLeftRadiusXBox.removeAttribute('disabled');
			this._borderTopRightRadiusXBox.setAttribute('disabled', true);
			this._borderBottomRightRadiusXBox.setAttribute('disabled', true);
			this._borderBottomLeftRadiusXBox.setAttribute('disabled', true);
		}
		if (rValue === 'onlyTwo') {
			this._borderTopLeftRadiusXBox.removeAttribute('disabled');
			this._borderTopRightRadiusXBox.removeAttribute('disabled');
			this._borderBottomRightRadiusXBox.setAttribute('disabled', true);
			this._borderBottomLeftRadiusXBox.setAttribute('disabled', true);
		}
		if (rValue === 'onlyThree') {
			this._borderTopLeftRadiusXBox.removeAttribute('disabled');
			this._borderTopRightRadiusXBox.removeAttribute('disabled');
			this._borderBottomRightRadiusXBox.removeAttribute('disabled');
			this._borderBottomLeftRadiusXBox.setAttribute('disabled', true);
		}
		if (rValue === 'allFour') {
			this._borderTopLeftRadiusXBox.removeAttribute('disabled');
			this._borderTopRightRadiusXBox.removeAttribute('disabled');
			this._borderBottomRightRadiusXBox.removeAttribute('disabled');
			this._borderBottomLeftRadiusXBox.removeAttribute('disabled');
		}
	}

	manageBoxesStateHandler(rValue) {
		const newBoxesState = {};
		Object.keys(this.state.boxesState).forEach(o => {
			if ( o === rValue) {
				newBoxesState[o] = true;
			} else {
				newBoxesState[o] = false;
			}
		});
		this.setState({boxesState: {...newBoxesState}}, () => {
			this.toggleBoxesDisplay(rValue);
		});
	}

	toggleYCheckBoxHandler() {
		this.resetYBoxValue("enableBorderTopLeftY");
		this.resetYBoxValue("enableBorderTopRightY");
		this.resetYBoxValue("enableBorderBottomRightY");
		this.resetYBoxValue("enableBorderBottomLeftY");

		this.setState({ enableYConfiguration: !this.state.enableYConfiguration }, () => {
			const { enableYConfiguration } = this.state;
			this.setState({
				enableBorderTopLeftY: enableYConfiguration,
				enableBorderTopRightY: enableYConfiguration,
				enableBorderBottomRightY: enableYConfiguration,
				enableBorderBottomLeftY: enableYConfiguration
			});
		});
	}

	toggleYCheckBoxesHandler(yOption) {
		const newState = { [yOption]: !this.state[yOption] };
		this.resetYBoxValue(yOption);
		this.setState(newState, () => {
			const { enableBorderTopLeftY, enableBorderTopRightY, enableBorderBottomRightY, enableBorderBottomLeftY } = this.state;
			if (!enableBorderTopRightY && !enableBorderTopRightY && !enableBorderBottomRightY && !enableBorderBottomLeftY) {
				this.setState({ enableYConfiguration: false });
			}
		});
	}

	valueUpdater(
		tLXV, tLYV, tRXV, tRYV,
		bLXV, bLYV, bRXV, bRYV
	) {
		const newState = {
			borderTopLeftRadiusXValue: tLXV,
			borderTopRightRadiusXValue: tRXV,
			borderBottomRightRadiusXValue: bRXV,
			borderBottomLeftRadiusXValue: bLXV,
		};
		Object.assign(newState,
			!this.state.enableBorderTopLeftY ? {borderTopLeftRadiusYValue: tLYV} : {},
			!this.state.enableBorderTopRightY ? {borderTopRightRadiusYValue: tRYV} : {},
			!this.state.enableBorderBottomRightY ? {borderBottomRightRadiusYValue: bRYV} : {},
			!this.state.enableBorderBottomLeftY ? {borderBottomLeftRadiusYValue: bLYV} : {}
		);
		this.setState(newState);
	}

	updateTextBoxesValues() {
		if (this.state.boxesState.onlyOne) {
			const {
				enableBorderTopLeftY, enableBorderTopRightY,
				enableBorderBottomLeftY, enableBorderBottomRightY
			} = this.state;
			const valAllX = this._borderTopLeftRadiusXBox.value;
			const valAllY = this._borderTopLeftRadiusYBox.value;
			this.valueUpdater(
				valAllX, enableBorderTopLeftY ? valAllY : valAllX, valAllX, enableBorderTopRightY ? valAllY : valAllX,
				valAllX, enableBorderBottomLeftY ? valAllY : valAllX, valAllX, enableBorderBottomRightY ? valAllY : valAllX
			);
		}
		if (this.state.boxesState.onlyTwo) {
			const valLeftCross = this._borderTopLeftRadiusXBox.value;
			const valRightCross = this._borderTopRightRadiusXBox.value;
			this.valueUpdater(
				valLeftCross, valLeftCross, valRightCross, valRightCross,
				valRightCross, valRightCross, valLeftCross, valLeftCross
			);
		}
		if (this.state.boxesState.onlyThree) {
			const valTopLeft = this._borderTopLeftRadiusXBox.value;
			const valRightCross = this._borderTopRightRadiusXBox.value;
			const valBottomRight = this._borderBottomRightRadiusXBox.value;
			this.valueUpdater(
				valTopLeft, valTopLeft, valRightCross, valRightCross,
				valRightCross, valRightCross, valBottomRight, valBottomRight
			);
		}
		if (this.state.boxesState.allFour) {
			const valTopLeft = this._borderTopLeftRadiusXBox.value;
			const valTopRight = this._borderTopRightRadiusXBox.value;
			const valBottomRight = this._borderBottomRightRadiusXBox.value;
			const valBottomLeft = this._borderBottomLeftRadiusXBox.value;
			this.valueUpdater(
				valTopLeft, valTopLeft, valTopRight, valTopRight,
				valBottomLeft, valBottomLeft, valBottomRight, valBottomRight
			);
		}
	}

	topLeftBoxXValueHandler() {
		const yValueState = {};
		if (!this.state.enableBorderTopLeftY) { // if disabled
			yValueState.borderTopLeftRadiusYValue = this._borderTopLeftRadiusXBox.value;
		}
		this.setState({ borderTopLeftRadiusXValue: this._borderTopLeftRadiusXBox.value, ...yValueState });
		this.updateTextBoxesValues();
	}

	topLeftBoxYValueHandler() {
		this.setState({ borderTopLeftRadiusYValue: this._borderTopLeftRadiusYBox.value });
	}

	topRightBoxXValueHandler() {
		const yValueState = {};
		if (!this.state.enableBorderTopRightY) { // if disabled
			yValueState.borderTopRightRadiusYValue = this._borderTopRightRadiusXBox.value;
		}
		this.setState({ borderTopRightRadiusXValue: this._borderTopRightRadiusXBox.value, ...yValueState });
		this.updateTextBoxesValues();
	}

	topRightBoxYValueHandler() {
		this.setState({ borderTopRightRadiusYValue: this._borderTopRightRadiusYBox.value });
	}

	bottomRightBoxXValueHandler() {
		const yValueState = {};
		if (!this.state.enableBorderBottomRightY) { // if disabled
			yValueState.borderBottomRightRadiusYValue = this._borderBottomRightRadiusXBox.value;
		}
		this.setState({ borderBottomRightRadiusXValue: this._borderBottomRightRadiusXBox.value, ...yValueState });
		this.updateTextBoxesValues();
	}

	bottomRightBoxYValueHandler() {
		this.setState({ borderBottomRightRadiusYValue: this._borderBottomRightRadiusYBox.value });
	}

	bottomLeftBoxXValueHandler() {
		const yValueState = {};
		if (!this.state.enableBorderBottomLeftY) { // if disabled
			yValueState.borderBottomLeftRadiusYValue = this._borderBottomLeftRadiusXBox.value;
		}
		this.setState({ borderBottomLeftRadiusXValue: this._borderBottomLeftRadiusXBox.value, ...yValueState });
		this.updateTextBoxesValues();
	}

	bottomLeftBoxYValueHandler() {
		this.setState({ borderBottomLeftRadiusYValue: this._borderBottomLeftRadiusYBox.value });
	}

	getCssUnit(value) {
		if (0 === parseInt(value) || '' === value || isNaN(parseInt(value.split('').reverse().join('')))) {
			return '';
		} else {
			return 'px';
		}
	}

	render() {
		const {
			enableYConfiguration,

			enableBorderTopLeftY,
			enableBorderTopRightY,
			enableBorderBottomRightY,
			enableBorderBottomLeftY,

			boxesState,

			borderTopLeftRadiusXValue, borderTopLeftRadiusYValue,
			borderTopRightRadiusXValue, borderTopRightRadiusYValue,
			borderBottomRightRadiusXValue, borderBottomRightRadiusYValue,
			borderBottomLeftRadiusXValue, borderBottomLeftRadiusYValue
		} = this.state;

		const style = {
			backgroundColor: '#eef',
			width: 200,
			height: 300,
			borderTopLeftRadius: `${borderTopLeftRadiusXValue+this.getCssUnit(borderTopLeftRadiusXValue)} ${borderTopLeftRadiusYValue+this.getCssUnit(borderTopLeftRadiusYValue)}`,
			borderTopRightRadius: `${borderTopRightRadiusXValue+this.getCssUnit(borderTopRightRadiusXValue)} ${borderTopRightRadiusYValue+this.getCssUnit(borderTopRightRadiusYValue)}`,
			borderBottomRightRadius: `${borderBottomRightRadiusXValue+this.getCssUnit(borderBottomRightRadiusXValue)} ${borderBottomRightRadiusYValue+this.getCssUnit(borderBottomRightRadiusYValue)}`,
			borderBottomLeftRadius: `${borderBottomLeftRadiusXValue+this.getCssUnit(borderBottomLeftRadiusXValue)} ${borderBottomLeftRadiusYValue+this.getCssUnit(borderBottomLeftRadiusYValue)}`
		};
		console.log(style)
		return(
			<div>
				<div>
					<label>
						<input checked={boxesState.onlyOne} ref={(r) => this._borderOnlyOneRadio = r} name='borderPropertyTypes' type="radio" onChange={ () => this.manageBoxesStateHandler('onlyOne') } /> All at once
					</label>
					<label>
						<input ref={(r) => this._borderOnlyTwoRadio = r} name='borderPropertyTypes' type="radio" onChange={ () => this.manageBoxesStateHandler('onlyTwo') } /> Only 2
					</label>
					<label>
						<input ref={(r) => this._borderOnlyThreeRadio = r} name='borderPropertyTypes' type="radio" onChange={ () => this.manageBoxesStateHandler('onlyThree') } /> Only 3
					</label>
					<label>
						<input ref={(r) => this._borderAllFourRadio = r} name='borderPropertyTypes' type="radio" onChange={ () => this.manageBoxesStateHandler('allFour') } /> All 4
					</label>
					<br/>
					<label>
						<input ref={(c) => this._xyCheckBox = c} type="checkbox" checked={enableYConfiguration} onChange={this.toggleYCheckBoxHandler} /> Enable Y values
					</label>
				</div>

				<div>
					<input ref={(i) => this._borderTopLeftRadiusXBox = i} type="text"
						value={borderTopLeftRadiusXValue} placeholder="border-top-left-radius-x" onChange={this.topLeftBoxXValueHandler} />
					<input ref={(i) => this._borderTopLeftRadiusYBox = i} type="text"
						value={borderTopLeftRadiusYValue} placeholder="border-top-left-radius-y" onChange={this.topLeftBoxYValueHandler} disabled={!enableBorderTopLeftY} />
					<label><input type="checkbox" checked={enableBorderTopLeftY} onChange={ () => this.toggleYCheckBoxesHandler('enableBorderTopLeftY') } /> Enable Y</label>|

					<input ref={(i) => this._borderTopRightRadiusXBox = i} type="text"
						value={borderTopRightRadiusXValue} placeholder="border-top-right-radius-x" onChange={this.topRightBoxXValueHandler} />
					<input ref={(i) => this._borderTopRightRadiusYBox = i} type="text"
						value={borderTopRightRadiusYValue} placeholder="border-top-right-radius-y" onChange={this.topRightBoxYValueHandler} disabled={!enableBorderTopRightY} />
					<label><input type="checkbox" checked={enableBorderTopRightY} onChange={ () => this.toggleYCheckBoxesHandler('enableBorderTopRightY') } /> Enable Y</label><br />

					<input ref={(i) => this._borderBottomLeftRadiusXBox = i} type="text"
						value={borderBottomLeftRadiusXValue} placeholder="border-bottom-left-radius-x" onChange={this.bottomLeftBoxXValueHandler} />
					<input ref={(i) => this._borderBottomLeftRadiusYBox = i} type="text"
						value={borderBottomLeftRadiusYValue}  placeholder="border-bottom-left-radius-y" onChange={this.bottomLeftBoxYValueHandler} disabled={!enableBorderBottomLeftY} />
					<label><input type="checkbox" checked={enableBorderBottomLeftY} onChange={ () => this.toggleYCheckBoxesHandler('enableBorderBottomLeftY') } /> Enable Y</label>|

					<input ref={(i) => this._borderBottomRightRadiusXBox = i} type="text"
						value={borderBottomRightRadiusXValue}  placeholder="border-bottom-right-radius-x" onChange={this.bottomRightBoxXValueHandler} />
					<input ref={(i) => this._borderBottomRightRadiusYBox = i} type="text"
						value={borderBottomRightRadiusYValue}  placeholder="border-bottom-right-radius-y" onChange={this.bottomRightBoxYValueHandler} disabled={!enableBorderBottomRightY} />
					<label><input type="checkbox" checked={enableBorderBottomRightY} onChange={ () => this.toggleYCheckBoxesHandler('enableBorderBottomRightY') } /> Enable Y</label>
				</div>

				<hr/>

				<div style={style}></div>
			</div>
		);
	}
}