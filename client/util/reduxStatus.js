const appendStatus = (status, type) => type + '/' + status;

const withStatus = (action, status, error = null) => (...args) => {
    if(error === true) {
        error = args.pop()
    }
    let payload = action(...args);
    payload.type += ('/' + status);
    payload.error = error;
    return payload;
};

const wrapAction = action => ({
    start: withStatus(action, 'start'),
    success: withStatus(action, 'success'),
    fail: withStatus(action, 'fail', true),
});

const start = appendStatus.bind(null, 'start');
const success = appendStatus.bind(null, 'success');
const fail = appendStatus.bind(null, 'fail');

module.exports = {
    wrapAction,
    start,
    success,
    fail
}