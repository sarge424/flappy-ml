
function sigmoid(x){
    return 1 / (1 + Math.exp(-x))
}

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function mutate(x){
    let ret = x
    if(Math.random() < 0.8){
        ret += randn_bm() * 0.5
    }

    return ret
}


class NeuralNetwork {
    constructor(layers){
        this.nodes = layers

        this.theta = []

        for(let i = 1; i < this.nodes.length; i++){
            //initialize each theta from t_2 to t_L
            let newTheta = new Matrix(this.nodes[i], this.nodes[i-1] + 1)
            this.theta.push(newTheta)
            newTheta.randomize()
        }
    }

    // return output based on theta2 and 3 based on input
    predict(input){
        // convert inp to matrix
        let inputMat = new Matrix(input.length, 1)

        for(let i = 0; i < inputMat.r; i++){
            inputMat.data[i][0] = input[i]
        }

        let activation = inputMat

        for(let i = 0; i < this.theta.length; i++){
            // add bias to prev layer
            activation.data.unshift([1])
            activation.r++
            
            // calculate newLayer
            activation = this.theta[i].mult(activation)
            activation.map(sigmoid)

        }

        return activation.data.map(row => row[0])
    }

    // create and return a mutated copy of this nn
    copy(){
        let newNet = new NeuralNetwork(this.nodes)
        
        for(let i = 0; i < this.theta.length; i++){
            newNet.theta[i] = this.theta[i].copy()
            newNet.theta[i].map(mutate)
        }

        return newNet
    }

    // save the net as a json string
    save(agentID){
        return JSON.stringify({
            id: agentID,
            nodes: this.nodes,
            theta: this.theta.map(t => t.data)
        })
    }

    // load a JSON string to this net
    load(json){
        const obj = JSON.parse(json)

        this.nodes = obj.nodes

        this.theta = []

        for(let i = 1; i < this.nodes.length; i++){
            //initialize each theta from t_2 to t_L
            let newTheta = new Matrix(this.nodes[i], this.nodes[i-1] + 1)
            this.theta.push(newTheta)
            newTheta.load(obj.theta[i-1])
        }
    }
}