/**
   * 获取上一个月
   * @date
   */
export const getPreMonth = (date) => {
  var nowdays = new Date(date);
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if(month==0){
          month=12;
          year=year-1;
  }
  return month
}