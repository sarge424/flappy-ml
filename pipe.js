class Pipe {
    constructor(x, v){
        this.x = x
        this.v = v
        this.gap = 125
        this.width = 24*4

        this.passed = false

        this.img = document.getElementById('ss')
        this.sprites = []

        this.sprites.push([0,0,24,10])
        this.sprites.push([0,11,24,20])

        this.gaptop = Math.random() * (arena.dim.y - this.gap)

        this.top = [0, this.width, this.gaptop]
        this.bot = [this.gaptop + this.gap, this.width, arena.dim.y]

        let edgeHeight = 10*this.width/24
        this.topEdge = [this.gaptop - edgeHeight, this.width, edgeHeight]
        this.botEdge = [this.gaptop + this.gap, this.width, edgeHeight]
    }

    update(ctx){
        this.x -= this.v

        if(this.x + this.width <= birdsX - birds[0].size.x){
            if(!this.passed)
                currentScore++
            this.passed = true
            this.color = '#0F0'
            closestPipe = pipes.filter(pipe => !pipe.passed)[0]
        }

        this.draw(ctx)
    }

    collide(bird){
        if(bird.p.x + bird.size.x >= this.x && bird.p.x - bird.size.x <= this.x + this.width){
            if(bird.p.y - bird.size.y <= this.gaptop || bird.p.y + bird.size.y >= this.gaptop + this.gap){
                bird.alive = false
            }
        }
    }

    draw(ctx){
        ctx.imageSmoothingEnabled = false
        
        ctx.beginPath()
        ctx.drawImage(this.img, ...this.sprites[1], this.x, ...this.top)
        ctx.drawImage(this.img, ...this.sprites[1], this.x, ...this.bot)
        ctx.drawImage(this.img, ...this.sprites[0], this.x, ...this.topEdge)
        ctx.drawImage(this.img, ...this.sprites[0], this.x, ...this.botEdge)
        ctx.fill()
    }
}