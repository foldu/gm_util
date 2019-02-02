const NodeBuilder = class {
    constructor(node) {
        this.inner = node;
    }

    text(s) {
        this.inner.textContent = s;
        return this;
    }

    child(node) {
        this.inner.appendChild(node.inner);
        return this;
    }

    attr(key, val) {
        this.inner[key] = val;
        return this;
    }

    eventListener(ev, f) {
        this.inner.addEventListener(ev, f);
        return this;
    }

    onClick(f) {
        return this.eventListener("click", f);
    }

    onChange(f) {
        return this.eventListener("change", f);
    }

    style(s) {
        this.attr("style", s);
        return this;
    }

    toNode() {
        return this.inner;
    }

};

const newNode = (nodeType) => new NodeBuilder(document.createElement(nodeType));

const htmlEscape = (str) => {
    const ESCAPE_TABLE = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#039;",
    };

    const ret = [];

    for (const c of str) {
        const match = ESCAPE_TABLE[c];
        if (match)
            ret.push(match);
        else
            ret.push(c);
    }

    return ret.join("");
};

const randNat = (start, stop) => {
    if (stop === undefined) {
        stop = start;
        start = 0;
    }

    return Math.floor(Math.random() * (stop - start) + start);
};

const leftPad = (char, len, str) => Array.from(Math.max(0, str.length - len)).fill(char).join("") + str;

const chunkArray = (arr, chunksz) => {
    const ret = [];
    for (let i = 0; i < arr.length; i += chunksz)
        ret.push(arr.slice(i, i + chunksz));
    return ret;
};

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);
