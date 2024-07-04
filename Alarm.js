class Alarm {
  constructor(time, day) {
    this.time = time;
    this.day = day;
    this.snoozeCount = 0;
    this.snoozeLimit = 3;
    this.snoozeInterval = 5 * 60 * 1000;
  }

  snooze() {
    if (this.snoozeCount < this.snoozeLimit) {
      this.snoozeCount++;
      console.log(
        `alarm snoozed for 5 minutes, remaining snooze left: ${this.snoozeCount}`
      );
      return this.snoozeInterval;
    } else {
      console.log("snooze limit is reached");
      return 0;
    }
  }

  resetSnooze() {
    this.snoozeCount = 0;
  }
}

module.exports = Alarm;
