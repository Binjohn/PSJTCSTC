/**
 * PSJTCSTC = PSJ Teacher Course System Time Correction
 *
 * 08:00 = 8:00 = 08:0 = 8:0 = 8: = 0800 = 800 = 08 = 8
 * 08:10 = 8:10 = 08:1 = 8:1 = 0810 = 810
 * 08:10 = 08.10 = 08 10 = 08+-*abc!@#10 = 08 <non-digits> 10
 *
 * @version 0.3
 */

javascript: function bjtCorrect(sObj) {
  // local variable
  var time = sObj.value;
  // trim leading and trailing non-digits
  time = time.replace(/^\D+|\D+$/g, "");
  // pad leading zeros // H*/HMM -> 0H*/0HMM
  if (time.match(/^\d(?=\D|$)|^\d\d\d$/)) {
    time = "0" + time;
  }
  // add ":" // HH/HH* -> HH:/HH:*
  if (time.match(/^\d\d(?=\d|$)/)) {
    time = time.slice(0, 2) + ":" + time.slice(2);
  }
  // pad trailing zeros // HH:/HH:M -> HH:00/HH:M0
  if (time.match(/^\d\d\D+$/)) {
    time += "00";
  } else if (time.match(/^\d\d\D+\d$/)) {
    time += "0";
  }
  // trim separators
  var m;
  if ((m = time.match(/^(\d\d)\D+(\d\d)$/)) != null) {
    time = m[1] + ":" + m[2];
  }
  // apply
  sObj.value = time;
}

javascript: (function () {
  // #ifndef // prevent re-injection
  if (typeof(bjtIsInjected) !== "undefined") { return; }
  window.bjtIsInjected = true;
  
  // inject Valid_sTime
  window.Valid_sTime_ = Valid_sTime;
  Valid_sTime = function(sObj) {
    bjtCorrect(sObj);
    Valid_sTime_(sObj);
  };
  // inject Valid_sTime_end
  window.Valid_sTime_end_ = Valid_sTime_end;
  Valid_sTime_end = function(sObj) {
    bjtCorrect(sObj);
    Valid_sTime_end_(sObj);
  };
})();

/**
 * changelog
 *
 * @version 0.3 2018-07-28
 * + Supports time format HHMM|HMM.
 * x Prevents re-injection, which causes infinite recursion.
 * x Declares local variables explicitly.
 * + Trim trailing non-digits.
 *
 * @version 0.2 2018-07-24
 * + Corrects time format automatically.
 *
 * @version 0.1 2018-07-24
 */
