import React, { Component } from 'react'

export default class Timer extends Component {
    constructor (props) {
        super(props)
        // Storage for completed times
        this.times = []
        this.started = false
        this.dispatchKeyEvents = this.dispatchKeyEvents.bind(this)
        this.state = {
            time: 0,
            active: false
        }
    }

    /**
     * Attach key events
     */
    componentWillMount () {
        window.addEventListener('keydown', this.dispatchKeyEvents)
    }

    /**
     * Remove key events
     */
    componentWillUnmount () {
        window.removeEventListener('keydown', this.dispatchKeyEvents)
    }

    /**
     * Handle timer start & stop updates
     */
    componentDidUpdate () {
        // If timer is active but has not started
        if (this.state.active && !this.started) {
            this.startTimer()
        }
        // If timer is not active but is running
        else if (!this.state.active && this.started) {
            this.stopTimer()
        }
    }

    /**
     * Handle key input
     */
    dispatchKeyEvents (event) {
        switch (event.code) {
        case 'Space':
            this.toggleTimer()
            break
        }
    }

    /**
     * Format minutes & seconds to include leading zeros
     */
    formatMinsAndSecs(mins, secs) {
        if (mins < 10) mins = `0${mins}`
        if (secs < 10) secs = `0${secs}`
        return `${mins}:${secs}:`
    }

    /**
     * Format milliseconds to include leading zeros
     */
    formatMillis(millis) {
        if (millis < 10) millis = `00${millis}`
        else if (millis < 100) millis = `0${millis}`
        return millis
    }

    /**
     * Get time in a formatted string
     */
    getTime (time) {
        time = new Date(time)
        const mins = time.getMinutes()
        const secs = time.getSeconds()
        const millis = time.getMilliseconds()
        return this.formatMinsAndSecs(mins, secs) + this.formatMillis(millis)
    }

    /**
     * Calculate elapsed time since last update and set state
     */
    updateTime () {
        const { active } = this.state

        this.elapsed = new Date().getTime() - this.start
        this.setState({ time: this.elapsed })
        if (active) requestAnimationFrame(this.updateTime.bind(this))
    }

    /**
     * Initiate timer
     */
    startTimer () {
        this.started = true
        this.start = new Date().getTime()
        this.elapsed = 0
        this.updateTime()
    }

    /**
     * Stop timer
     */
    stopTimer () {
        const { time } = this.state
        this.times.push(time)
        this.started = false
        this.elapsed = 0
        this.setState({ active: false })
    }

    /**
     * Toggle timer start / stop
     */
    toggleTimer () {
        this.setState(state => state.active = !state.active)
    }

    /**
     * Print items in previous time list
     */
    buildTimeList () {
        return this.times.map(time => (
            <pre className="timer__previous" key={time}>{ this.getTime(time) }</pre>
        ))
    }

    render () {
        return (
            <div className="timer" onClick={this.toggleTimer.bind(this)}>
                <pre className="timer__label">{ this.getTime(this.state.time) }</pre>
                { this.times.length > 0 && this.buildTimeList() }
            </div>
        )
    }
}
