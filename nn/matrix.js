
class Matrix {
    constructor(rows, cols){
        this.r = rows
        this.c = cols
        this.data = []

        for(let i = 0; i < this.r; i++){
            this.data.push([])
            for(let j = 0; j < this.c; j++){
                this.data[i].push(0)
            }
        }
    }

    // display matrix as table
    disp(){
        console.table(this.data)
    }

    randomize(){
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                this.data[i][j] = Math.random()*2 - 1
            }
        }
    }

    // add a matrix (assumed to be of correct dimensions) or scalar
    add(other){
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                if(other instanceof Matrix){
                    this.data[i][j] += other.data[i][j]
                }else{
                    this.data[i][j] += other
                }
            }
        }
    }

    // element-wise scale with a matrix (assumed to be of correct dimensions) or scalar
    scale(other){
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                if(other instanceof Matrix){
                    this.data[i][j] *= other.data[i][j]
                }else{
                    this.data[i][j] *= other
                }
            }
        }
    }

    // get the nth column of the matrix as an array
    getCol(index){
        let ret = []

        for(let i = 0; i < this.r; i++){
            ret.push(this.data[i][index])
        }

        return ret
    }

    // returns the weighted sum of two arrays
    static solve(arr1, arr2){
        let ret = 0

        for(let i = 0; i < arr1.length; i++){
            ret += arr1[i] * arr2[i]
        }

        return ret
    }

    // multiply this matrix with another and return as a new matrix
    mult(other){
        let ret = new Matrix(this.r, other.c)

        for(let i = 0; i < ret.r; i++){
            for(let j = 0; j < ret.c; j++){
                ret.data[i][j] = Matrix.solve(this.data[i], other.getCol(j))
            }
        }

        return ret
    }
    // apply a function to each element of the Matrix
    map(fn){
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                this.data[i][j] = fn(this.data[i][j])
            }
        }
    }

    // makes a deep copy and returns as a Matrix
    copy(){
        let newMat = new Matrix(this.r, this.c)
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                newMat.data[i][j] = this.data[i][j]
            }
        }

        return newMat
    }

    // loads values from an array into data
    load(arr) {
        for(let i = 0; i < this.r; i++){
            for(let j = 0; j < this.c; j++){
                this.data[i][j] = arr[i][j]
            }
        }
    }
}