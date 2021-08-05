class Pipe {
    constructor(x, v){
        this.x = x
        this.v = v
        this.gap = 175
        this.width = 100

        this.passed = false

        this.color = '#0F0'

        this.gaptop = Math.random() * (arena.dim.y - this.gap)

        this.top = [0, this.width, this.gaptop]
        this.bot = [this.gaptop + this.gap, this.width, arena.dim.y - (this.gaptop + this.gap)]
    }

    update(ctx){
        this.x -= this.v

        if(this.x + this.width <= birdsX - birds[0].rad){
            if(!this.passed)
                currentScore++
            this.passed = true
            this.color = '#0F0'
            closestPipe = pipes.filter(pipe => !pipe.passed)[0]
            closestPipe.color = '#F40'
        }

        this.draw(ctx)
    }

    collide(bird){
        if(bird.p.x + bird.rad >= this.x && bird.p.x - bird.rad <= this.x + this.width){
            if(bird.p.y - bird.rad <= this.gaptop || bird.p.y + bird.rad >= this.gaptop + this.gap){
                bird.alive = false
            }
        }
    }

    draw(ctx){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.rect(this.x, ...this.top)
        ctx.rect(this.x, ...this.bot)
        ctx.fill()
    }
}