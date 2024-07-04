const Alarm = require('./Alarm');

class AlarmClock {
  constructor() {
    this.alarms = [];
  }

  displayCurrentTime() {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`Current time: ${currentTime}`);
  }

  addAlarm(time, day) {
    if (this.alarms.some(alarm => alarm.time === time && alarm.day === day)) {
      console.log(`Alarm is already set for ${day} at ${time}.`);
      return;
    }
    const alarm = new Alarm(time, day);
    this.alarms.push(alarm);
    console.log(`Alarm set for ${day} at ${time}.`);
  }

  deleteAlarm(time, day) {
    const initialLength = this.alarms.length;
    this.alarms = this.alarms.filter(alarm => alarm.time !== time || alarm.day !== day);
    if (this.alarms.length < initialLength) {
      console.log(`Deleted alarm set for ${day} at ${time}.`);
    } else {
      console.log(`No alarm found for ${day} at ${time}.`);
    }
  }

  checkAlarms() {
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentTime = now.toLocaleTimeString('en-GB', { hour12: false });

    this.alarms.forEach(alarm => {
      if (alarm.day === currentDay && alarm.time === currentTime) {
        console.log(`Alarm ringing: ${alarm.time} on ${alarm.day}`);
        alarm.resetSnooze();
      }
    });
  }
}

module.exports = AlarmClock;
