const ROZMIAR_KRATKI = 25;
const POLE = 20;

function createSnake(x = 10, y = 10) {
    return [{ x, y }];
}

function moveSnake(snake, velocityX, velocityY) {
    const head = snake[0];
    return [{
        x: head.x + velocityX,
        y: head.y + velocityY
    }, ...snake.slice(1)];
}

function checkWallCollision(head) {
    return head.x < 0 || head.x >= POLE || head.y < 0 || head.y >= POLE;
}

function checkSelfCollision(snake) {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function checkFoodCollision(head, food) {
    return head.x === food.x && head.y === food.y;
}

function growSnake(snake) {
    return [...snake];
}

function shrinkSnake(snake) {
    return snake.slice(0, -1);
}

function canChangeDirection(currentVelocityX, currentVelocityY, newVelocityX, newVelocityY) {
    if (currentVelocityX === 1 && newVelocityX === -1) return false;
    if (currentVelocityX === -1 && newVelocityX === 1) return false;
    if (currentVelocityY === 1 && newVelocityY === -1) return false;
    if (currentVelocityY === -1 && newVelocityY === 1) return false;
    return true;
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * POLE),
        y: Math.floor(Math.random() * POLE)
    };
}

function isFoodInBounds(food) {
    return food.x >= 0 && food.x < POLE && food.y >= 0 && food.y < POLE;
}

function isFoodInteger(food) {
    return Number.isInteger(food.x) && Number.isInteger(food.y);
}

describe('Snake Movement', () => {
    test('initial position at center (10, 10)', () => {
        const snake = createSnake(10, 10);
        expect(snake[0].x).toBe(10);
        expect(snake[0].y).toBe(10);
    });

    test('horizontal movement - right', () => {
        const snake = createSnake(10, 10);
        const moved = moveSnake(snake, 1, 0);
        expect(moved[0].x).toBe(11);
        expect(moved[0].y).toBe(10);
    });

    test('vertical movement - down', () => {
        const snake = createSnake(10, 10);
        const moved = moveSnake(snake, 0, 1);
        expect(moved[0].x).toBe(10);
        expect(moved[0].y).toBe(11);
    });
});

describe('Wall Collision Detection', () => {
    test('left wall collision', () => {
        const head = { x: -1, y: 10 };
        expect(checkWallCollision(head)).toBe(true);
    });

    test('right wall collision', () => {
        const head = { x: 20, y: 10 };
        expect(checkWallCollision(head)).toBe(true);
    });

    test('top wall collision', () => {
        const head = { x: 10, y: -1 };
        expect(checkWallCollision(head)).toBe(true);
    });

    test('bottom wall collision', () => {
        const head = { x: 10, y: 20 };
        expect(checkWallCollision(head)).toBe(true);
    });

    test('no collision in bounds', () => {
        const head = { x: 10, y: 10 };
        expect(checkWallCollision(head)).toBe(false);
    });
});

describe('Self Collision Detection', () => {
    test('self collision detected', () => {
        const snake = [
            { x: 10, y: 10 },
            { x: 11, y: 10 },
            { x: 10, y: 10 }
        ];
        expect(checkSelfCollision(snake)).toBe(true);
    });

    test('no self collision', () => {
        const snake = [
            { x: 10, y: 10 },
            { x: 11, y: 10 },
            { x: 11, y: 11 }
        ];
        expect(checkSelfCollision(snake)).toBe(false);
    });
});

describe('Food Eating', () => {
    test('food eaten - collision detected', () => {
        const head = { x: 5, y: 5 };
        const food = { x: 5, y: 5 };
        expect(checkFoodCollision(head, food)).toBe(true);
    });

    test('food not eaten', () => {
        const head = { x: 5, y: 5 };
        const food = { x: 6, y: 6 };
        expect(checkFoodCollision(head, food)).toBe(false);
    });

    test('growSnake preserves length', () => {
        const snake = [{ x: 10, y: 10 }, { x: 11, y: 10 }];
        const grown = growSnake(snake);
        expect(grown.length).toBe(snake.length);
    });
});

describe('Direction Change Prevention', () => {
    test('cannot reverse up to down', () => {
        expect(canChangeDirection(0, -1, 0, 1)).toBe(false);
    });

    test('cannot reverse down to up', () => {
        expect(canChangeDirection(0, 1, 0, -1)).toBe(false);
    });

    test('cannot reverse left to right', () => {
        expect(canChangeDirection(-1, 0, 1, 0)).toBe(false);
    });

    test('cannot reverse right to left', () => {
        expect(canChangeDirection(1, 0, -1, 0)).toBe(false);
    });

    test('can change to perpendicular direction', () => {
        expect(canChangeDirection(1, 0, 0, 1)).toBe(true);
        expect(canChangeDirection(1, 0, 0, -1)).toBe(true);
    });
});

describe('Food Random Generation', () => {
    test('food position within bounds', () => {
        for (let i = 0; i < 100; i++) {
            const food = generateFood();
            expect(isFoodInBounds(food)).toBe(true);
        }
    });

    test('food position is integer', () => {
        for (let i = 0; i < 100; i++) {
            const food = generateFood();
            expect(isFoodInteger(food)).toBe(true);
        }
    });
});
