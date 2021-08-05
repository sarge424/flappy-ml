class Bird {
    constructor(i, x, y, c){
        this.id = i
        this.p = new v2(x, y)
        
        this.rad = 15
        this.vy = 0
        this.grav = 1
        this.jumpForce = 10
        this.kb = 0
        this.inp = 0

        this.brain = new NeuralNetwork([3, 1])

        this.topPoint = new v2(0, 0)
        this.botPoint = new v2(0, 0)

        this.alive = true
        this.createdAt = c
        this.aliveFor = 0

        this.score = 0
        this.fitness = 0

        this.color = 'yellow'
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

        if(this.p.y - this.rad <= 0 || this.p.y + this.rad >= arena.dim.y){
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
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(...this.p.lst(), this.rad, 0, 2*Math.PI)
        ctx.fill()
    }
}