'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player(name, isTurn, symbol) {
  _classCallCheck(this, Player);

  this.name = name;
  this.isTurn = isTurn;
  this.symbol = symbol;
};

var player1 = new Player('Garrett', true, 'X');
var player2 = new Player('John', false, 'O');
