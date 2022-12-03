'use strict'

var possible = "0123456789";

const getRandomNumber =()=> {
    return possible.charAt(Math.floor(Math.random()*possible.length));
}

const getFourRandom=() => {
    return getRandomNumber() + getRandomNumber() + getRandomNumber() + getRandomNumber() + getRandomNumber() + getRandomNumber()+ getRandomNumber() + getRandomNumber();
}

const getUID=()=>{
    return Number(getFourRandom());  
}

module.exports = getUID;