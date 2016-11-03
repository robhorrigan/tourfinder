import React from 'react'
import './HomeView.scss'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import GoogleAuthButton from 'components/GoogleAuthButton'
import CalendarImage from './calendar-image.png'

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
      alert('Thank you for booking your tour through The Knot! Check your inbox for an email from our Venue Concierge.')
    }
  }

  render () {
    return (
      <div>
        { this.state.events.length === 0
        ? <div>
          <h1>The Tour Management Tool</h1>
          <img
            alt='Calendar Icon'
            className='calendar-icon'
            src={CalendarImage} />
          <h4>Welcome!</h4>
          <h6>This tool helps you book tours with brides - instantly.</h6>
          <h6>Easy. Fast. Simple.</h6>
          <GoogleAuthButton
            className='google-button'
            onSuccess={this._onAuthGoogle}>
            Sync with Google Calendar
          </GoogleAuthButton>
        </div>
        : <div>
          <div className='breadcrumbs'>
            <h6>Home &#x203A; Wedding Reception Venues &#x203A; Tour Management Tool</h6>
          </div>
          <h4 className='instructions'>
            Click on an available tour slot below to <u>instantly</u> reserve your desired timeslot.
          </h4>
          <BigCalendar
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
          />
        </div>}
      </div>
    )
  }
}
