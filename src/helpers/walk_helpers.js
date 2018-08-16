export const getNextCell = (triangularTessellation, [cellId0, cellId1], direction) => {
    const cellIds = triangularTessellation.get(cellId0);
    const indexOfCellId = cellIds.indexOf(cellId1);

    if (indexOfCellId === -1) {
        console.error('Cannot find related cellId');
    }

    const nextIndex = (indexOfCellId + direction + cellIds.length) % cellIds.length;

    return cellIds[nextIndex];
};
