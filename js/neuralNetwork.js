const model = tf.sequential();

const hidden1 = tf.layers.dense({
    units: 18,
    inputShape: [9],
    activation: 'relu',
    useBias: true
});

const hidden2 = tf.layers.dense({
    units: 9,
    activation: 'relu',
    useBias: true
});

const output = tf.layers.dense({
    units: 1,
    activation: 'relu',
    useBias: true
});

const learing_rate = 0.0001;
const opt = tf.train.adam(learing_rate);

model.add(hidden1);
model.add(tf.layers.dropout(0.1));
model.add(hidden2);
model.add(tf.layers.dropout(0.1));
model.add(output);
model.compile({
    optimizer: opt,
    loss: tf.losses.meanSquaredError
});

async function train(history, result) {
    if (result != 1){
        result = 0;
    }

    history = history.map(s => s.map(p => p == 2 ? -1 : p));

    const targets = Array(history.length).fill(result);
    await model.fit(tf.tensor2d(history, [history.length, 9]), tf.tensor2d(targets, [history.length, 1]));
}

function evaluate(state){
    return model.predict(tf.tensor2d(state, [1, 9])).arraySync()[0][0];
}

