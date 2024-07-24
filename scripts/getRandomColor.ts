export const getRandomColor = (p0: number) => {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};