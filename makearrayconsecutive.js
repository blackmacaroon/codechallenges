function makeArrayConsecutive2(statues) {
    // no dups
    //
    statues.sort((a, b) => {
        return a-b
    })
    let count = 0
    let min = statues[0]
    let max = statues[statues.length-1]
    // don't need to start off at zero, just checking min to max
    for(let i = min; i < max; i++){
        // if it's not contained in the original array
        if(statues.indexOf(i) === -1)
        count ++
    }
    console.log(count)
}

statues = [6, 2, 3, 9]

makeArrayConsecutive2(statues)