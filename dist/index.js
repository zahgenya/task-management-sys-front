"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postgres_1 = require("@vercel/postgres");
const pino_http_1 = __importDefault(require("pino-http"));
const app = (0, express_1.default)();
const logger = (0, pino_http_1.default)({
    level: 'info',
});
app.use((0, cors_1.default)());
app.use(logger);
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.get('/', (_req, res) => {
    res.send('Hello World');
});
app.get('/ping', (_req, res) => {
    console.log('pinged here');
    res.send('pong');
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status } = req.body;
    try {
        const result = yield (0, postgres_1.sql) `
      INSERT INTO Tasks (title, description, status)
      VALUES (${title}, ${description}, ${status})
      `;
        return res.status(201).json({ result });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}));
app.get('/tasks', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `
    SELECT * FROM Tasks;
    `;
        return res.status(200).json({ result });
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}));
app.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, postgres_1.sql) `
    DELETE FROM Tasks WHERE id = ${req.params.id}
    `;
        if (result.rowCount === 1) {
            return res.status(200).json({ message: 'Succesfully deleted' });
        }
        else {
            return res.status(204).json({ message: 'Task not found' });
        }
    }
    catch (err) {
        return res.status(500).json({ err });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
