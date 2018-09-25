new Vue({
  el: '#app',
  data: {
    started: false,
    playerHealth: 100,
    monsterHealth: 100,
    playerAttackMin: 3,
    playerAttackMax: 10,
    monsterAttackMin: 5,
    monsterAttackMax: 12,
    specialAttackMin: 10,
    specialAttackMax: 20,
    healValue: 10,
    turns: []
  },
  methods: {
    attack: function (min, max) {
      var damage = this.randomValue(min, max);
      this.monsterHealth -= damage;
      this.monsterAttacks();
      this.pushTurns(damage, max == 20 ? 'whacks' : 'hits', 'player');
    },
    heal: function () {
      this.playerHealth += this.healValue;
      if (this.playerHealth > 100) this.playerHealth = 100;
      this.monsterAttacks();
      this.pushTurns(this.healValue, 'heals', 'player');
    },
    monsterAttacks: function () {
      var damage = this.randomValue(this.monsterAttackMin, this.monsterAttackMax);
      this.playerHealth -= damage;
      this.pushTurns(damage, 'hits', 'monster');
    },
    randomValue: function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    startNew: function () {
      this.started = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    pushTurns: function (damage, type, whoIs) {
      var enemy = whoIs == 'player' ? 'monster' : 'player';
      var hitOrHeal = type == 'heals' ? 'heals' : type + ' ' + enemy;
      var text = whoIs + ' ' + hitOrHeal + ' ' + 'for ' + damage;

      this.turns.unshift({
        who: whoIs,
        text: text
      });
    }
  },
  watch: {
    playerHealth: function () {
      if (this.playerHealth < 0 && this.monsterHealth > 0) {
        alert('Player Lost');
        this.started = false;
      }
      if (this.playerHealth > 0 && this.monsterHealth < 0) {
        alert('Player Won');
        this.started = false;
      }
    }
  }
});