"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLodashTemplate = compileLodashTemplate;
/** Compile a lodash-style template string (`<%= expression %>`) into a render function. */
function compileLodashTemplate(template) {
    const parts = [];
    let lastIndex = 0;
    const re = /<%=\s*([\s\S]+?)\s*%>/g;
    let match;
    while ((match = re.exec(template)) !== null) {
        parts.push(JSON.stringify(template.slice(lastIndex, match.index)));
        parts.push(`String(${match[1]})`);
        lastIndex = match.index + match[0].length;
    }
    parts.push(JSON.stringify(template.slice(lastIndex)));
    const fn = new Function('obj', `with (obj) { return ${parts.join(' + ')}; }`);
    return (params) => fn(params);
}
//# sourceMappingURL=template.js.map