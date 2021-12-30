import eventCreator from '../model/eventCreator.js';

let template = null;

const createNewItemNode = () => {
    if (!template) {
        template = document.getElementById('item');
    }

    return template.content.firstElementChild.cloneNode(true);
};

const attachEventsToItemElement = (el, cardIndex, itemIndex, dispatch) => {
    const deleteHandler = e => dispatch(eventCreator.deleteItem(cardIndex, itemIndex));
    const updateHandler = e => dispatch(eventCreator.updateItem(cardIndex, itemIndex, e.target.value));
    const toggleCompleteHandler = e => dispatch(eventCreator.toggleItemCompleted(cardIndex, itemIndex));

    el.querySelector('.item-delete').addEventListener('click', deleteHandler);
    el.querySelector('.item-content').addEventListener('blur', updateHandler);
    el.querySelector('.checkbox').addEventListener('change', toggleCompleteHandler);
};

const getItemElement = (data, cardIndex, itemIndex, dispatch) => {
    const { complete, content } = data;
    const element = createNewItemNode();

    const elCheckBox = element.querySelector('.checkbox');
    elCheckBox.checked = complete;
    elCheckBox.id = `${cardIndex}-${itemIndex}`;
    element.querySelector('.label').htmlFor = `${cardIndex}-${itemIndex}`;
    element.querySelector('.item-content').value = content;
    
    attachEventsToItemElement(element, cardIndex, itemIndex, dispatch);

    return element;
};

export default (targetElement, state, dispatch) => {
    const { cards } = state;
    const newItemList = targetElement.cloneNode(true);
    const cardIndex = targetElement.dataset.cardIndex;
    
    newItemList.innerHTML = '';
    
    if (!cards.length || cards.length - 1 < cardIndex || cardIndex < 0) {
        return newItemList;
    }
    
    const itemList = cards[cardIndex].list;

    itemList
    .map((item, index) => getItemElement(item, parseInt(cardIndex, 10), parseInt(index, 10), dispatch))
    .forEach(el => newItemList.appendChild(el));

    return newItemList;
};