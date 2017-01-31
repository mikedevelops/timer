import React, { Component } from 'react'

export default class Timer extends Component {
    constructor (props) {
        super(props)

        this.state = {
            time: 0,
            active: false
        }
    }

    formatMinsAndSecs(mins, secs) {
        if (mins < 10) mins = `0${mins}`
        if (secs < 10) secs = `0${secs}`
        return `${mins}:${secs}:`
    }

    formatMillis(millis) {
        if (millis < 10) millis = `00${millis}`
        else if (millis < 100) millis = `0${millis}`
        return millis
    }

    printTime () {
        const time = new Date(this.state.time)
        const mins = time.getMinutes()
        const secs = time.getSeconds()
        const millis = time.getMilliseconds()
        return this.formatMinsAndSecs(mins, secs) + this.formatMillis(millis)
    }

    updateTime () {
        this.elapsed = new Date().getTime() - this.start
        this.setState({ time: this.elapsed });
    }

    startTimer () {
        this.start = new Date().getTime()
        this.elapsed = 0
        this.updateTime()
    }

    toggleTimer () {
        this.setState(state => state.active = !state.active)
    }

    componentDidUpdate () {
        if (this.state.active) {
            this.startTimer()
            requestAnimationFrame(this.updateTime.bind(this))
        }
    }

    render () {
        return (
            <div className="timer" onClick={this.toggleTimer.bind(this)}>
                <pre className="timer__label">{ this.printTime() }</pre>
            </div>
        )
    }
}
