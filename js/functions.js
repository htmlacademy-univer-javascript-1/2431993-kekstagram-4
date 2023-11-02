const hoursToMinutes = (time) => +time.split(':')[0]*60 + +time.split(':')[1];

const chekWorkTime = (startWorkDay, endWorkDay, startMeeting, meetingTime) => {
  const startWorkDayInMinutes = hoursToMinutes(startWorkDay);
  const endWorkDayInMinutes = hoursToMinutes(endWorkDay);
  const startMeetingInMinutes = hoursToMinutes(startMeeting);
  const endMeetingInMinutes = startMeetingInMinutes + meetingTime;

  const isMeetingWithinWorkHours = startMeetingInMinutes >= startWorkDayInMinutes && endMeetingInMinutes <= endWorkDayInMinutes;

  return isMeetingWithinWorkHours;
};
chekWorkTime();
