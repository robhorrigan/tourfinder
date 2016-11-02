import React from 'react'
import styles from './HomeView.scss'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import GoogleAuthButton from 'components/GoogleAuthButton'

BigCalendar.momentLocalizer(moment)

type Props = {}

export default class HomeView extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this.state = {
      events: []
    }

    this._onAuthGoogle = this._onAuthGoogle.bind(this)
    this._onSelectEvent = this._onSelectEvent.bind(this)
  }

  _onAuthGoogle (events) {
    if (events.length > 0) {
      this.setState({ events: events })
    }
  }

  _onSelectEvent (event) {
    if (window.confirm(`Are you sure you want to book a tour on ${event.start}?`)) {
      alert('The vendor has been notified of your booking.')
    }
  }

  render () {
    return (
      <div>
        { this.state.events.length === 0
        ? <div>
          <h4>Welcome!</h4>
          <h6>This tool helps you book a tour with a vendor - instantly.</h6>
          <h6>Easy. Fast. Simple.</h6>
          <GoogleAuthButton
            className={styles.googleButton}
            onSuccess={this._onAuthGoogle}>
            Sync with Google Calendar
          </GoogleAuthButton>
        </div>
        : <BigCalendar
          selectable
          onSelectEvent={this._onSelectEvent}
          min={new Date(moment(10, 'HH'))}
          max={new Date(moment(19, 'HH'))}
          defaultDate={new Date()}
          step={2}
          timeslots={15}
          events={this.state.events}
          defaultView='week'
          views={['month', 'week', 'day']}
        />}
      </div>
    )
  }
}
