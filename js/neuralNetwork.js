const model = tf.sequential();

const input = tf.layers.dense({
    units: 9,
    inputShape: [1, 9, 1],
    kernelInitializer: 'randomUniform',
    activation: 'sigmoid'
});

const hidden = tf.layers.dense({
    units: 18,
    kernelInitializer: 'randomUniform',
    activation: 'sigmoid'
});

const output = tf.layers.dense({
    units: 1,
    kernelInitializer: 'randomUniform',
    activation: 'sigmoid'
});

const learing_rate = 0.001;
const sgdOpt = tf.train.sgd(learing_rate);


model.add(input);
//model.add(hidden);
model.add(output);
model.compile({
    optimizer: sgdOpt,
    loss: tf.losses.meanSquaredError
});

function train(history, result) {
    if (result != 1){
        result = 0;
    }

    history.map(s => model.fit(tf.tensor(s), result));
}

function evaluate(state){
    return model.predict(tf.tensor(state));
}

