"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (items) => {
    let total = 0;
    if (items.length === 0) {
        total = 0;
    }
    else {
        for (let i = 0; i < items.length; i++) {
            total += Number(items[i].price);
        }
    }
    return total;
};
