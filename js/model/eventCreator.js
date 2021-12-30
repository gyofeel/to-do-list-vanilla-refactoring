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
        type: EVENT_TYPES.CARD_ADDED
    }),
    deleteCard: (index) => ({
        type: EVENT_TYPES.CARD_DELETED,
        payload: index
    }),
    updateCardTitle: (index, text) => ({
        type: EVENT_TYPES.CARD_TITLE_UPDATED,
        payload: {
            index,
            text
        }
    }),
    switchCardOrder: (index1, index2) => ({
        type: EVENT_TYPES.CARD_ORDER_SWITCHED,
        payload: {
            index1,
            index2
        }
    }),
    addItem: (index) => ({
        type: EVENT_TYPES.ITEM_ADDED,
        payload: index
    }),
    deleteItem: (cardIndex, itemIndex) => ({
        type: EVENT_TYPES.ITEM_DELETED,
        payload: {
            cardIndex,
            itemIndex
        }
    }),
    updateItem: (cardIndex, itemIndex, text) => ({
        type: EVENT_TYPES.ITEM_UPDATED,
        payload: {
            cardIndex,
            itemIndex,
            text
        }
    }),
    switchItemOrder: (cardIndex, itemIndex1, itemIndex2) => ({
        type: EVENT_TYPES.ITEM_ORDER_SWITCHED,
        payload: {
            cardIndex,
            itemIndex1,
            itemIndex2
        }
    }),
    toggleItemCompleted: (cardIndex, itemIndex) => ({
        type: EVENT_TYPES.ITEM_COMPLETED_TOGGLED,
        payload: {
            cardIndex,
            itemIndex
        }
    })
}