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
    deleteCard: (id) => ({
        type: CARD_DELETED,
        payload: id
    }),
    updateCardTitle: (id, text) => ({
        type: CARD_TITLE_UPDATED,
        payload: {
            id,
            text
        }
    }),
    switchCardOrder: (id1, id2) => ({
        type: CARD_ORDER_SWITCHED,
        payload: {
            id1,
            id2
        }
    }),
    addItem: () => ({
        type: ITEM_ADDED
    }),
    deleteItem: (id) => ({
        type: ITEM_DELETED,
        payload: id
    }),
    updateItem: (id, text) => ({
        type: ITEM_UPDATED,
        payload: {
            id,
            text
        }
    }),
    switchItemOrder: (id1, id2) => ({
        type: ITEM_ORDER_SWITCHED,
        payload: {
            id1,
            id2
        }
    }),
    toggleItemCompleted: (id) => ({
        type: ITEM_COMPLETED_TOGGLED,
        payload: {
            id
        }
    })
}