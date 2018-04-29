import reset from '../js/reset';
import run from './run'

describe('options', () =>

    it('reset', () => {
        return Promise.all([
            run(``, reset, {}),
            run(``, reset, { reset: true }),
            run(``, ``, { reset: false }),
            run(`a {}`, reset + `\na {}`, {})
        ])
    })
);
