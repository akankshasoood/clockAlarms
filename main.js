const readline = require("readline");
const AlarmClock = require("./AlarmClock");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const alarmClock = new AlarmClock();

function displayMenu() {
  console.log(`\nMenu:
1. Display Current Time
2. Set an Alarm
3. Delete an Alarm
4. Exit\n`);
}

function alarmsList() {
  if (alarmClock.alarms.length === 0) {
    console.log("No alarm added");
  } else {
    console.log("Current alarms:");
    alarmClock.alarms.forEach((alarm, index) => {
      console.log(`${index + 1}. Time: ${alarm.time}, Day: ${alarm.day}`);
    });
  }
}

function isValidTime(time) {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return regex.test(time);
}

function main() {
  displayMenu();

  rl.question("Choose an option: ", (option) => {
    switch (option) {
      case "1":
        alarmClock.displayCurrentTime();
        main();
        break;
      case "2":
        alarmsList();
        console.log("enter the time in 24-hour format (HH:MM:SS).");
        rl.question("Enter alarm time (HH:MM:SS): ", (time) => {
          if (!isValidTime(time)) {
            console.log(
              "Invalid time format. Please enter time in 24-hour format (HH:MM:SS)."
            );
            main();
            return;
          }
          rl.question("Enter day of the week: e.g Monday,Tuesday :", (day) => {
            alarmClock.addAlarm(time, day);
            main();
          });
        });
        break;
      case "3":
        alarmsList();
        rl.question('Select the alarm number to delete: ', (index) => {
          const alarmIndex = parseInt(index, 10) - 1;
          if (isNaN(alarmIndex) || alarmIndex < 0 || alarmIndex >= alarmClock.alarms.length) {
            console.log("Invalid alarm number. Please try again.");
            main();
          } else {
            const alarm = alarmClock.alarms[alarmIndex];
            alarmClock.deleteAlarm(alarm.time, alarm.day);
            console.log(`Deleted alarm: Time: ${alarm.time}, Day: ${alarm.day}`);
            main();
          }
        });
        break;
      case "4":
        console.log("exit done");
        rl.close();
        break;
      default:
        console.log("please select from above options below");
        main();
        break;
    }
  });
}

setInterval(() => {
  alarmClock.checkAlarms();
}, 1000);

main();
