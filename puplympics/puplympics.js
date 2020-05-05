const fs = require('fs')
let puplympians = {},
  pups = [],
  raceLength = 3461
  
// read and clean the .txt file
fs.readFile('input.txt', (err, data) => {
    if (err) throw err; 
    const content = data.toString()
    processFile(content)
    winnerDist()
    pointsPerSecond()
    winnerPoints()
}) 

// dog object constructor!
function Dog(fps, maxruntime, rest){
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
    }
  }
}

// convert the .txt into a dev-friendly data structure
function processFile(content){
  let refinedContent = content.replace(/\n/g, '').replace(/ runs/g, '').replace(/ ft\/s for up to/g, '').replace(/seconds, and then needs to rest for /g, '').replace(/ seconds/g, ''),
    // separate data per line
    dogsData = refinedContent.split('.'),
    dogDataArray = []
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

// kept this the same - calculates the total distance traveled by each pooch and returns the winner for farthest distance 
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
  console.log(winner + " wins farthest distance!! - traveling " + farthest + " feet")
}

//KNOWN FLAW - does not account for 3-way tie   :[
function pointsPerSecond(){
  // for every second in the race
  for(let i=1;i<raceLength+1;i++){
    // checks each dog's distance at that second, adds to distances array to compare
    let dogs = Object.keys(puplympians)
    let distances = []
    for (let j = 0; j<dogs.length; j++){
      puplympians[dogs[j]].calculateDistance(i)
      distances.push(puplympians[dogs[j]].distanceTraveled)
    }
    // compare distances, find indexOf farthest dog/dogs
    let farthest = 0
    let farthestPup = 0
    let tie = 0
    for(let k=0; k <= distances.length; k++){
      if(distances[k]>=farthest){
        farthestPup = k
        farthest = distances[k]
      } else if (distances[k + 1] == farthest){
        tie = k+1
      }
    }
    // increment one point for the dog that is the farthest
    // if there's two tied, each gets a point
    if (tie === 0){
      puplympians[dogs[farthestPup]].points ++
    } else {
      puplympians[dogs[farthestPup]].points ++
      puplympians[dogs[tie]].points ++
    }
  }
}
// returns the dog with the most points by the end of the race
function winnerPoints(){
  let pointsArr = []
  // loop through dogs points, add to array
  Object.keys(puplympians).forEach(dog => {
    pointsArr.push(puplympians[dog].points)
  })
  // find index of largest number
  let winnerIndex = pointsArr.indexOf(Math.max(...pointsArr))
  console.log(pups[winnerIndex].name + " wins most points!! - collecting " + pups[winnerIndex].points + " points")
}

