import React from 'react'
import PropTypes from 'prop-types'
import Box from './Box'

const styles = {
	display: 'inline-block',
	transform: 'rotate(-7deg)',
	WebkitTransform: 'rotate(-7deg)',
}

export default class BoxDragPreview extends React.PureComponent<
	BoxDragPreviewProps,
	BoxDragPreviewState
> {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	interval: any

	constructor(props: BoxDragPreviewProps) {
		super(props)
		this.tick = this.tick.bind(this)
		this.state = {
			tickTock: false,
		}
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 500)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		const { title } = this.props
		const { tickTock } = this.state

		return (
			<div style={styles}>
				<Box title={title} yellow={tickTock} />
			</div>
		)
	}

	tick() {
		this.setState({
			tickTock: !this.state.tickTock,
		})
	}
}
