class v2 {
    constructor(x,y){
        this.x = x
        this.y = y
    }

    add(o){
        return new v2(this.x + o.x, this.y + o.y)
    }
    sub(o){
        return new v2(this.x - o.x, this.y - o.y)
    }
    mul(o){
        return new v2(this.x * o.x, this.y * o.y)
    }
    div(o){
        return new v2(this.x / o.x, this.y / o.y)
    }
    scl(a){
        return new v2(this.x * a, this.y * a)
    }
    mag(){
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
    nor(){
        return this.mag() == 0? this : this.scl(1/this.mag())
    }
    rot(t){
        return new v2(Math.cos(t), Math.sin(t)).scl(this.mag())
    }
    lst(){
        return [this.x, this.y]
    }
    flp(){
        return new v2(this.y, this.x)
    }
    map(f){
        return new v2(f(this.x), f(this.y))
    }
}