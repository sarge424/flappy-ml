class Bird {
    constructor(i, x, y, c, bot = false){
        this.id = i
        this.p = new v2(x, y)
        
        this.size = new v2(15, 10)

        this.vy = 0
        this.grav = 1
        this.jumpForce = 10
        this.kb = 0
        this.inp = 0

        this.isLoaded = bot

        this.brain = new NeuralNetwork([3, 1])

        this.topPoint = new v2(0, 0)
        this.botPoint = new v2(0, 0)

        this.alive = true
        this.createdAt = c
        this.aliveFor = 0

        this.score = 0
        this.fitness = 0

        this.img = document.getElementById('ss')
        this.sprites = []
        this.sprites.push([25,0,15,10])
        this.sprites.push([25,10,15,10])
        this.sprites.push([25,20,15,10])
        this.sprites.push([41,0,15,10])
        this.sprites.push([41,10,15,10])
        this.sprites.push([41,20,15,10])
    }

    update(ctx){
        if(!this.alive)
            return

        this.getInput()
        this.calculateScore()

        if(this.inp > 0.75){
            this.jump()
        }

        this.vy = Math.min(this.vy + this.grav, 15)
        this.p.y += this.vy

        if(this.p.y - this.size.y <= 0 || this.p.y + this.size.y >= arena.dim.y){
            this.alive = false
        }

        this.draw(ctx)
    }

    getInput(){
        this.topPoint = new v2(closestPipe.x, closestPipe.gaptop)
        this.botPoint = new v2(closestPipe.x, closestPipe.gaptop + closestPipe.gap)

        this.inp = this.brain.predict([this.p.y, Math.abs(this.p.y - closestPipe.gaptop), Math.abs(this.p.y - (closestPipe.gaptop + closestPipe.gap))])[0]
    }

    jump(){
        this.vy = -this.jumpForce
        this.kb = 0
    }

    calculateScore(){
        //claculate score
    }

    calculateFitness(){
        // calculate fitness function
    }

    draw(ctx){
        let sprite = []
        let offset = this.isLoaded? 3:0
        if(Math.abs(this.vy) < 3)
            sprite = this.sprites[0 + offset]
        else{
            sprite = this.vy > 0 ? this.sprites[1 + offset]: this.sprites[2 + offset]
        }

        ctx.imageSmoothingEnabled = false

        ctx.beginPath()
        ctx.drawImage(this.img, ...sprite, ...this.p.sub(this.size).lst(), ...this.size.scl(2).lst())
        ctx.fill()
    }
}