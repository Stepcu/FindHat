const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define class
class Field {
  constructor(hatAndHoles, field) {
    this._field  = field;
    this._hatAndHoles = hatAndHoles;
  }
  //play game method
  playGame() {
    let y = 0; 
    let x = 0;
    this.print(this._field);
   
    while (this._hatAndHoles[y][x] === pathCharacter || this._hatAndHoles[y][x] === fieldCharacter) {
      const direction = prompt('Please choose a direction, enter U for Up, D for  Down, L for Left or R for Right. \n');
    
    if (direction.toUpperCase() === 'U') {
      if (y === 0) {
        console.log('Invalid Up movement. Please choose another direction')
      } else {
        y -=1
      }
    } else if (direction.toUpperCase() === 'D') {
        if (y >= this._field.length) {
          console.log('Invalid Down movement. Please choose another direction')
        } else {
          y +=1
        }
      } else if (direction.toUpperCase() === 'L') {
        if (x === 0) {
          console.log('Invalid Left movement. Please choose another direction')
        } else {
          x -= 1
        }
      } else if (direction.toUpperCase() === 'R') {
        if (x >= this._field[y].length) {
          console.log('Invalid Right movement. Please choose another direction')
        } else {
          x += 1
        }
      } else {
        console.log('Invalid entry. Please enter U, D, L or R')
      } 
      if (this._hatAndHoles[y][x] === hat) {
        console.log('You win, found a Hat!')
      } else if (this._hatAndHoles[y][x] === hole) {
        console.log('Game Over, you fell in a hole!')
      } else {
        this._field[y][x] = pathCharacter;
        this.print(this._field);
      }
    } 
  }
  //print field method
  print() {
    for (let row of this._field){
      console.log(row.join(' '));
    }
  }
  
  //generate field with hat and holes
  static generateField(height, width, holes) {
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    let hatX = Math.floor(Math.random() * width);
    let hatY = Math.floor(Math.random() * height);
    newField[hatY][hatX] = hat;
    
    for (let k = holes; k > 0; k--) {
      let holeX = hatX;
      let holeY = hatY;
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * width)
      };
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * height)
      };
     newField[holeY][holeX] = hole; 
    }
    return newField;
  } 
  
  //generate blank field for the user to traverse without seeing the hat and holes
  static generateBlankField(height, width){
    let newField = [];
    for (let i = 0; i < height; i++) {
      newField.push([]);
      for (let j = 0; j < height; j++) {
          newField[i].push(fieldCharacter)
      };
    };
    newField[0][0] = pathCharacter;
    return newField;
  }
}


let myField 

//create the blank field for the user to see
const blankField = Field.generateBlankField(5, 5)

//created the field with the hat and holes
const newField = Field.generateField(5, 5, 1);
console.log(blankField);

//instantiate a Field object using newField = hatAndHoles and field = blankField  
myField = new Field (newField, blankField);

//call playGame method
myField.playGame();
