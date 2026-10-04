// DEV-04: layer stack so Escape closes only the top layer.
const stack: string[] = [];
export const pushLayer = (id: string) => { if (!stack.includes(id)) stack.push(id); };
export const removeLayer = (id: string) => { const i = stack.indexOf(id); if (i >= 0) stack.splice(i, 1); };
export const isTopLayer = (id: string) => stack.length > 0 && stack[stack.length - 1] === id;
export const resetLayers = () => { stack.length = 0; };
