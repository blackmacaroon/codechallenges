const fs = require('fs'),
  puplympians = {},
  raceLength =  2//3461,
  pups = []

// read and clean the .txt file, run the tests
fs.readFile('input.txt', (err, data) => { 
    if (err) throw err; 
    const content = data.toString()
    processFile(content)
    // winnerDist()
    winnerPoints()
}) 

// dog object constructor!
function Dog(name, fps, maxruntime, rest){
  this.name=name,
  this.fps=fps,
  this.maxruntime=maxruntime,
  this.rest=rest,
  this.points=0;
  this.distanceTraveled=0
  this.calculateDistance=function(timer){
    let feetPerRound = this.fps * this.maxruntime
    let roundInSeconds = this.rest + this.maxruntime
    let circuits = timer/roundInSeconds
    let wholeCircuit = Math.floor(circuits)
    let feetPerCircuit = feetPerRound * wholeCircuit
    let remainder = timer % roundInSeconds
    // if dog is resting when time is up
    if(remainder >= this.maxruntime){
      let totalDist = feetPerCircuit + feetPerRound
      this.distanceTraveled = totalDist
      
    } else {
     // if dog is still running when time is up
      let totalDist = (remainder * this.fps) + feetPerCircuit
      this.distanceTraveled = totalDist
      // console.log(this.distanceTraveled)
    }
  }
}


// convert the .txt into a dev-friendly data structure
function processFile(content){
  let refinedContent = content.replace(/\n/g, '').replace(/ runs/g, '').replace(/ ft\/s for up to/g, '').replace(/seconds, and then needs to rest for /g, '').replace(/ seconds/g, ''),
    // separate data per line
    dogsData = refinedContent.split('.'),
    dogDataArray = []
    // format to arrays 
    // console.log("line 27", dogsData)
    for(dog in dogsData){
      // takes care of the weird empty string by requiring length
      if(dogsData[dog].length>0){
        let dogs = dogsData[dog].split(' ')
        dogDataArray.push(dogs)
      }
      
    }
    // format to objects 
    let keys = ["name", "fps", "maxruntime", "rest"]
    for(let i = 0; i<dogDataArray.length; i++){
      let stat = dogDataArray[i],
      dogObj = new Dog()
      for(let j =0; j<keys.length; j++){
        if(keys[j] === "name"){
          dogObj[keys[j]] = stat[j]
        } else {
          dogObj[keys[j]] = parseInt(stat[j])
        }
      }
      puplympians[dogObj.name] = dogObj
      pups.push(dogObj)
    }
}

// kept this the same 
function winnerDist(){
  let distances = []
  pups.forEach(function(dog){
    let feetPerRound = dog.fps * dog.maxruntime
    let roundInSeconds = dog.rest + dog.maxruntime
    let circuits = raceLength/roundInSeconds
    let wholeCircuit = Math.floor(circuits)
    let feetPerCircuit = feetPerRound * wholeCircuit
    let remainder = raceLength % roundInSeconds
    // these dogs are resting when time is up
    if(remainder >= dog.maxruntime){
      totalDist = feetPerCircuit + feetPerRound
      distances.push(totalDist)
      
    } else {
     // these dogs are still running when time is up
      totalDist = (remainder * dog.fps) + feetPerCircuit
      distances.push(totalDist)
    }
    console.log(distances)
  })
  // calculate which dog ran the farthest
  let farthest = 0
  let winner = ''
  for(let i=0; i <= farthest; i++){
    if(distances[i]>=farthest){
      farthest = distances[i]
      winner = pups[i].name
    }
  }
  console.log(winner + " wins!! - traveling " + farthest + " feet")
  
}

function winnerPoints(){
  // for every second in the race
  for(let i=1;i<raceLength+1;i++){
    // check each dog's distance
    let dogs = Object.keys(puplympians)
    let distances = []
    for (let j = 0; j<dogs.length; j++){
      puplympians[dogs[j]].calculateDistance(i)
      distances.push(puplympians[dogs[j]].distanceTraveled)
    }
    console.log(distances)

    // increment one point for the dog that is the farthest
    let farthest = distances[0]
    let farthestPup = 0
    for(let k=0; k <= distances.length; k++){
      
      if(distances[k]>farthest){
        farthestPup = k
        farthest = distances[k]
      } else {
        // in case of a tie
        console.log("wtf")
      }
    }
    puplympians[dogs[farthestPup]].points ++
  }
  console.log(puplympians)
}