new Vue({
    el: '#app',
    data: {
        running: true,
        playerLife: 100,
        monsterLife: 100,
        power: false,
        logs: []
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods:{
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.log = []
        },
        attack(especial) {
            this.power = false
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if(this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
        },
        hurt(prop, min, max, especial, source, target, classe) {
            const plus = especial ? 5: 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}.`, classe)
        },
        healAndHurt(power) {
            if(power) {
                this.heal(15,30) 
            } else {
                this.heal(5,20) 
            }
            this.hurt('playerLife', 7,12,false, 'Monstro', 'Jogador', 'monster')
        },
        heal(min,max) {
            this.power = false
            const heal = this.getRandom(min,max)
            this.registerLog(`Jogador ganhou cura de ${heal}.`, 'player')
            this.playerLife = Math.min(this.playerLife + heal, 100)
        },
        increasePower() {
            this.power = true
            this.registerLog(`Jogador habilitou o ataque especial.`, 'player')
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        getRandom(min,max) {
            const value = Math.random() * (max-min) + min
            return Math.round(value)
        },
        registerLog(text,classe) {
            this.logs.unshift({ text, classe })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})