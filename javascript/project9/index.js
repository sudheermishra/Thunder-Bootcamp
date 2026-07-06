// Olympic 2028 count down time
// timestimpe of date of olympic - current date time stamp

// time stamp kese nikalnge
// const timestamp = Date.now();
// console.log(timestamp);

// Output:

// 1783312345678

// Ye number 1 January 1970, 00:00:00 UTC (Unix Epoch) se lekar abhi tak kitne milliseconds beet chuke hain, wo batata hai.

// dono ke time stamp nikal liye ab subtract kr denge toh hume ek value milegi  ab usko hume hours minute second me convert krna h

// example : - 4440 second
// 1 hour = 60min*60sec = 3600 second ek hour me
//  4440/3600 yeh convert kr dega hour me = 1 hour 840 second = 840 second ko minute = 840/60 = 14 min

// 1 second = 1000 miliSecond

// currentTimeStamp = 1783315990997 milisecond;
// olympicTimeStamp = 1847125800000 milisecond;
// remainingTime = 63809809003 milisecond;

// days me convert krenge
// Milliseconds ko days me convert karne ke liye pehle ye yaad rakho:

// 1 second = 1000 ms
// 1 minute = 60 seconds
// s1 hour = 60 minutes
// 1 day = 24 hours

// Isliye:

// 1 day = 1000 × 60 × 60 × 24
//  1 day  = 86,400,000 millisecond

// remainingTime / 1 daytime in miliSecond
// 63809809003 milisecond /  86,400,000 milisecond   = 738.539456053
// Math.floor(738.539456053)  = 738 days

// days = 738

setInterval(() => {
  let currentTimeStamp = Date.now();
  let olympicTimeStamp = new Date(2028, 6, 14).getTime();

  let remainingTime = olympicTimeStamp - currentTimeStamp;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  remainingTime %= 1000 * 60 * 60 * 24;

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  remainingTime %= 1000 * 60 * 60;

  const minute = Math.floor(remainingTime / (1000 * 60));
  remainingTime %= 1000 * 60;

  const second = Math.floor(remainingTime / 1000);
  remainingTime %= 1000;

  const element = document.querySelector("h2");
  element.textContent = `${days} days ${hours} hours ${minute} min ${second} sec`;
}, 1000);
