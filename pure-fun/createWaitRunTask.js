const createWaitRunTask = (initTaskList=[])=>{
  let taskList = JSON.parse(JSON.stringify(initTaskList))
  return (targTask={},callback=()=>{})=>{
    let taskIndex = taskList.findIndex(item=>targTask.id === item.id)
    if(taskIndex>-1){
      callback(taskList[taskIndex])
      taskList.splice(taskIndex,1);
    }
    return taskList
  }
}


var list = [{id:1,name:23},{id:2,name:888}]
let runTask = createWaitRunTask(list);
let taskList = runTask({id:2},res=>{
  debugger
})
debugger