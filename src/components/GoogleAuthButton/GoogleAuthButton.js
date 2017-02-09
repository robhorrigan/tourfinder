import React from 'react'
import Button from 'components/Button'

type Props = {
  className: String,
  onSuccess: Function,
  onFailure: Function,
  children: String
}

const CLIENT_ID = '866056842021-59l5jrsslev2c4brkuh7s99tllccclcu.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

export default class GoogleAuthButton extends React.Component {
  props: Props

  constructor (props) {
    super(props)

    this._listUpcomingEvents = this._listUpcomingEvents.bind(this)
    this._loadCalendarApi = this._loadCalendarApi.bind(this)
    this._onClick = this._onClick.bind(this)
    this._handleAuthResult = this._handleAuthResult.bind(this)
  }

  _listUpcomingEvents () {
    let request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date(2016, 9, 15)).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime'
    })

    request.execute((resp) => {
      let events = resp.items
      let calEvents = []
      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          let event = events[i]

          let start = event.start.dateTime
          if (!start) {
            start = event.start.date
          }

          let end = event.end.dateTime
          if (!end) {
            end = event.end.date
          }

          let calEvent = {
            'title': event.summary,
            'start': new Date(start),
            'end': new Date(end)
          }

          calEvents.push(calEvent)
        }
        this.props.onSuccess(calEvents)
      } else {
        console.log('No upcoming events found.')
      }
    })
  }

  _loadCalendarApi () {
    gapi.client.load('calendar', 'v3', this._listUpcomingEvents);
  }

  _handleAuthResult (authResult) {
    if (authResult && !authResult.error) {
      this._loadCalendarApi()
    } else {
      console.log('Failed to auth')
    }
  }

  _onClick () {
    gapi.auth.authorize(
      { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
      this._handleAuthResult)
    return false
  }

  render () {
    const { className, children } = this.props

    return (
      <Button type='button' className={className} onClick={this._onClick}>
        {children}
      </Button>
    )
  }
}
