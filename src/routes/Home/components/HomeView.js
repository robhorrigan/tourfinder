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
  }

  _onAuthGoogle (events) {
    if (events.length > 0) {
      this.setState({ events: events })
    }
  }

  render () {
    return (
      <div>
        { this.state.events.length === 0
        ? <div>
          <h4>Welcome!</h4>
          <GoogleAuthButton
            className={styles.googleButton}
            onSuccess={this._onAuthGoogle}>
            Login with Google
          </GoogleAuthButton>
        </div>
        : <BigCalendar
          selectable
          onSelectEvent={event => alert('An alert has been sent to this vendor!')}
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
