new Vue({
  el: '#app',
  data: {
    started: false,
    playerHealth: 100,
    monsterHealth: 100,
    attackMaxValue: 10,
    healMaxValue: 5,
    specialAttackMaxValue: 20,
    turns: []
  },
  methods: {
    attack: function (range) {
      var playerDamage = this.randomValue(range);
      var monsterDamage = this.randomValue(range);
      this.playerHealth -= playerDamage;
      this.monsterHealth -= monsterDamage;
      this.pushTurns([
        playerDamage,
        monsterDamage
      ]);
    },
    heal: function (range) {
      this.playerHealth += this.randomValue(range);
      if (this.playerHealth > 100) this.playerHealth = 100;
      this.playerHealth -= this.randomValue(this.attackMaxValue);
      this.pushTurns([
        this.playerDamage,
        this.monsterDamage
      ]);
    },
    randomValue: function (range) {
      return Math.floor(Math.random() * Math.floor(range));
    },
    startNew: function () {
      this.started = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    pushTurns: function (turn) {
      this.turns.push({
        player: turn[0],
        monster: turn[1]
      });
    }
  },
  watch: {
    playerHealth: function () {
      if (this.playerHealth < 0 && this.monsterHealth > 0) {
        alert('Player Lost');
        this.startNew();
      }
      if (this.playerHealth > 0 && this.monsterHealth < 0) {
        alert('Player Won');
        this.startNew();
      }
      if (this.playerHealth < 0 && this.monsterHealth < 0) {
        alert('Draw');
        this.startNew();
      }
    }
  }
});