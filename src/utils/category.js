// Chuyển danh sách categories phẳng thành dạng cây
export function buildCategoryTree(categories) {
    const idMap = {};
    const tree = [];

    categories.forEach(cat => {
        idMap[cat.id] = { ...cat, children: [] };
    });

    categories.forEach(cat => {
        const parents = cat["parent-category"];
        if (parents && parents.length > 0) {
            parents.forEach(parent => {
                if (idMap[parent.id]) {
                    idMap[parent.id].children.push(idMap[cat.id]);
                }
            });
        } else {
            tree.push(idMap[cat.id]);
        }
    });

    return tree;
} 