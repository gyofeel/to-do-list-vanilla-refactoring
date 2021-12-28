const EVENT_TYPES = Object.freeze({
    CARD_ADDED: 'CARD_ADDED',
    CARD_DELETED: 'CARD_DELETED',
    CARD_TITLE_UPDATED: 'CARD_TITLE_UPDATED',
    CARD_ORDER_SWITCHED: 'CARD_ORDER_SWITCHED',
    ITEM_ADDED: 'ITEM_ADDED',
    ITEM_DELETED: 'ITEM_DELETED',
    ITEM_UPDATED: 'ITEM_UPDATED',
    ITEM_ORDER_SWITCHED: 'ITEM_ORDER_SWITCHED',
    ITEM_COMPLETED_TOGGLED: 'ITEM_COMPLETED_TOGGLED'
});

export default {
    addCard: () => ({
        type: CARD_ADDED
    }),
    deleteCard: (index) => ({
        type: CARD_DELETED,
        payload: index
    }),
    updateCardTitle: (index, text) => ({
        type: CARD_TITLE_UPDATED,
        payload: {
            index,
            text
        }
    }),
    switchCardOrder: (index1, index2) => ({
        type: CARD_ORDER_SWITCHED,
        payload: {
            index1,
            index2
        }
    }),
    addItem: (index) => ({
        type: ITEM_ADDED,
        payload: index
    }),
    deleteItem: (cardIndex, itemIndex) => ({
        type: ITEM_DELETED,
        payload: {
            cardIndex,
            itemIndex
        }
    }),
    updateItem: (cardIndex, itemIndex, text) => ({
        type: ITEM_UPDATED,
        payload: {
            cardIndex,
            itemIndex,
            text
        }
    }),
    switchItemOrder: (cardIndex, itemIndex1, itemIndex2) => ({
        type: ITEM_ORDER_SWITCHED,
        payload: {
            cardIndex,
            itemIndex1,
            itemIndex2
        }
    }),
    toggleItemCompleted: (cardIndex, itemIndex) => ({
        type: ITEM_COMPLETED_TOGGLED,
        payload: {
            cardIndex,
            itemIndex
        }
    })
}