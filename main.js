let ctx
let frame = -1
let framerate = 100
let msPerFrame = 1000 / framerate

const birdsX = 200
const pipeSpawnRate = 150
let currentScore = 0

const population = 20
let gen = 0

let birdID = 0
let birds = []
let closestPipe
let pipes = []

let arena = {
    dim: new v2(1000, 500),
    start: function(){
        this.c = document.getElementById('canvas')
        ctx = this.c.getContext('2d')

        this.c.width = this.dim.x
        this.c.height = this.dim.y
        
        createPopulation()

        this.interval = setInterval(arena.update, msPerFrame)

        document.addEventListener('keydown', e => {
            if(e.key == ' ')
                birds[0].kb = 1
        })
    },

    update: function(){
        frame++
        arena.clear()

        if(frame % pipeSpawnRate == 0){
            pipes.push(new Pipe(1000, 3))
            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0)

            closestPipe = pipes.filter(pipe => !pipe.passed)[0]
        }

        let lastAlive
        if(birds.filter(bird => bird.alive).length == 0)
            lastAlive = birds.filter(bird => bird.alive)[0]
        else
            lastAlive = null 

        for(pipe of pipes){
            pipe.update(ctx)
            for(bird of birds)
                pipe.collide(bird)
        }

        for(bird of birds){
            bird.update(ctx)
        }


        if(birds.filter(bird => bird.alive).length == 0){
            //all birds died
            frame = -1
            pipes = []
            createPopulation(lastAlive)
        }

        arena.displayStats()

    },

    clear: function(){
        ctx.clearRect(0,0,...this.dim.lst())
    },

    pause: function(){
        clearInterval(this.interval)
    },

    play: function(){
        this.interval = setInterval(arena.update, msPerFrame)
    },

    updateFramerate: function(newrate){
        this.pause()
        framerate = newrate
        msPerFrame = 1000 / framerate
        this.play()
    },

    displayStats: function(){
        ctx.font = '20px Arial'
        ctx.fillStyle = 'black'
        ctx.fillText(`Generation: ${gen}`, 3, 20)
        ctx.fillText(`Alive currently: ${birds.filter(bird => bird.alive).length}/${population}`, 3, 40)
        ctx.fillText(`Score: ${currentScore}`, 3, 60)
        ctx.fillText(`ID: ${gen == 'Loaded bird' ? '>>>':''}${birds.filter(bird => bird.alive).length == 1 ? birds.filter(bird => bird.alive)[0].id: ''}`, 3, 80)
    }
}

function createPopulation(parent){
    gen++
    birds = []
    currentScore = 0
    let i = 0
    
    if(parent instanceof Bird){
        parent.p = new v2(birdsX, 250)
        parent.vy = 0
        parent.alive = true
        parent.createdAt = frame
        parent.aliveFor = 0
        parent.score = 0
        parent.fitness = 0

        birds.push(parent)
        i++
    }

    for(; i < population; i++){
        let newBird = new Bird(birdID, birdsX, 250, frame)
        birdID++

        if(parent instanceof Bird){
            if(i <= population/4){
                newBird.brain = parent.brain.copy()
            }
        }

        birds.push(newBird)
    }
}

function generateJSON(){
    console.log('Generating JSON...');
    const textArea = document.getElementById('jsonArea')
    lastAlive = birds.filter(bird => bird.alive)[0]
    textArea.value = lastAlive.brain.save(lastAlive.id)
}

function getJSON(){
    return document.getElementById('jsonArea').value
}

function loadBird(){
    let json = getJSON()
    console.log(json);
    let strongBird = new Bird(`${JSON.parse(json).id}`, birdsX, 250, frame)
    strongBird.brain.load(json)
    
    gen = 'Loaded bird'
    birds = []
    currentScore = 0

    birds.push(strongBird)
}

arena.start()