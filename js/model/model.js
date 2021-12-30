import { getFormattedDate } from '../utils.js';

const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
};

const INITIAL_STATE = {
    userName: 'gyofeel',
    date: getFormattedDate(new Date()),
    cards: [{
        title: '테스트1',
        list: [
            {
                content: '아이템 테스트 1',
                complete: true
            },
            {
                content: '아이템 테스트 2',
                complete: true
            },
            {
                content: '아이템 테스트 3',
                complete: true
            },
            {
                content: '아이템 테스트 4',
                complete: true
            }
        ],
        completeCount: 4,
        totalCount: 4
    },
    {
        title: '테스트2',
        list: [
            {
                content: '아이템 테스트 1',
                complete: true
            },
            {
                content: '아이템 테스트 2',
                complete: true
            },
            {
                content: '아이템 테스트 3',
                complete: true
            },
            {
                content: '아이템 테스트 4',
                complete: true
            }
        ],
        completeCount: 4,
        totalCount: 4
    },
    {
        title: '테스트3',
        list: [],
        completeCount: 0,
        totalCount: 0
    }],
};

const addCard = (state) => {
    return {
        ...state,
        cards: [...state.cards, {
            title: '',
            list: [],
            completeCount: 0,
            totalCount: 0
        }]
    };
};

const deleteCard = (state, event) => {
    const index = event.payload;

    if (index < 0) {
        return state;
    }
    
    return {
        ...state,
        cards: state.cards.filter((card, i) => i !== index)
    };
};

const updateCardTitle = (state, event) => {
    const { index, text } = event.payload;

    if (index < 0 || !text) {
        return state;
    }

    return {
        ...state,
        cards: state.cards.map((card, i) => {
            if (i === index) {
                card.title = text
            }

            return card;
        })
    };
};

const switchCardOrder = (state, event) => {
    const { index1, index2 } = event.payload;

    if (index1 < 0 || index2 < 0) {
        return state;
    }

    const cards = JSON.parse(JSON.stringify(state.cards));
    const temp = JSON.parse(JSON.stringify(cards[index1]));
    cards[index1] = cards[index2];
    cards[index2] = temp;

    return {
        ...state,
        cards
    };
};

const addItem = (state, event) => {
    const index = event.payload;

    if (index < 0) {
        return state;
    }

    return {
        ...state,
        cards: state.cards.map((card, i) => {
            if (i === index) {
                card.list.push({
                    content: '',
                    complete: false
                });
                card.totalCount++;
            }

            return card;
        })
    };
};

const deleteItem = (state, event) => {
    const { cardIndex, itemIndex } = event.payload;

    if (cardIndex < 0 || itemIndex < 0) {
        return state;
    }

    return {
        ...state,
        cards: state.cards.map((card, i) => {
            if (i === cardIndex) {
                let updatedCard = {
                    ...card,
                    list: card.list.filter((item, itemIdx) => itemIdx !== itemIndex),
                    totalCount: card.totalCount -1
                }
                updatedCard.completeCount = updatedCard.list.filter((item) => item.complete).length
                
                return updatedCard;
            }

            return card;
        })
    };
};

const updateItem = (state, event) => {
    const { cardIndex, itemIndex, text } = event.payload;
    if (cardIndex < 0 || itemIndex < 0 || !text) {
        return state;
    }

    return {
        ...state,
        cards: state.cards.map((card, i) => {
            if (i === cardIndex) {
                return {
                    ...card,
                    list: card.list.map((item, i) => {
                        if (i === itemIndex) {
                            item.content = text;
                        }

                        return item;
                    })
                };
            }

            return card;
        })
    }
};

const switchItemOrder = (state, event) => {
    const { cardIndex, itemIndex1, itemIndex2 } = event.payload;
    
    if (cardIndex < 0 || itemIndex1 < 0 || itemIndex2 < 0) {
        return state;
    }

    const cards = JSON.parse(JSON.stringify(state.cards));
    const card = cards[cardIndex];
    const temp = card.list[itemIndex1];
    card.list[itemIndex1] = card.list[itemIndex2];
    card.list[itemIndex2] = temp;

    return {
        ...state,
        cards
    };
};

const toggleItemComplete = (state, event) => {
    const { cardIndex, itemIndex } = event.payload;

    if (cardIndex < 0 || itemIndex < 0) {
        return state;
    }

    return {
        ...state,
        cards: state.cards.map((card, i) => {
            if (i === cardIndex) {
                let complete = false;
                const updatedCard = {
                    ...card,
                    list: card.list.map((item, i) => {
                        if (i === itemIndex) {
                            complete = !item.complete;
                            item.complete = complete;
                        }

                        return item;
                    })
                };
                updatedCard.completeCount = updatedCard.completeCount + (complete ? 1 : -1);
                
                return updatedCard;
            }

            return card;
        })
    }
};

const methods = {
    CARD_ADDED: addCard,
    CARD_DELETED: deleteCard,
    CARD_TITLE_UPDATED: updateCardTitle,
    CARD_ORDER_SWITCHED: switchCardOrder,
    ITEM_ADDED: addItem,
    ITEM_DELETED: deleteItem,
    ITEM_UPDATED: updateItem,
    ITEM_ORDER_SWITCHED: switchItemOrder,
    ITEM_COMPLETED_TOGGLED: toggleItemComplete
};

export default (initialState = INITIAL_STATE) => {
    return (prevState, event) => {
        if (!prevState) {
            return cloneDeep(initialState);
        }

        const currentModifier = methods[event.type];
        
        if (!currentModifier) {
            return prevState;
        }

        return currentModifier(prevState, event);
    }
};