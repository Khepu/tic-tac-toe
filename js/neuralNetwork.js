const model = tf.sequential();

const hidden1 = tf.layers.dense({
    units: 18,
    inputdim: 9,
    kernelInitializer: 'normal',
    activation: 'relu'
});
model.add(hidden);

const hidden2 = tf.layers.dense({
    units: 9,
    kernelInitializer: 'normal',
    activation: 'relu'
});
model.add(hidden2);

const output = tf.layers.dense({
    units: 1,
    kernelInitializer: 'normal'
});
model.add(output);

learing_rate = 0.001

const sgd0pt = tf.train.sgd(learing_rate);
model.compile({
    optimizer: sgd0pt,
    loss: tf.losses.meanSquaredError
})